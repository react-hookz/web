import {useRef, useState, useCallback, useEffect} from 'react';

export type IndexedDBOptions<TTables extends readonly string[]> = {
	/**
	 * Name of database
	 */
	name: string;
	/**
	 * Version of database
	 * @default 1
	 */
	version: number;
	/**
	 * Tables names list to be initialized
	 * @example ['users'] as const
	 */
	tables: TTables;
};

/**
 * Uses IndexedDB to create database, put, get and remove items like blobs, files or complex structures
 * @param options Initial options to follow while creating database
 * @returns
 */
export const useIndexedDBValue = <TTables extends readonly string[]>(
	options: IndexedDBOptions<TTables>,
) => {
	const dbRef = useRef<IDBDatabase | null>(null);

	const [isConnecting, setIsConnecting] = useState(false);
	const [isReady, setIsReady] = useState(false);

	const init = useCallback(() => {
		setIsConnecting(true);

		const request = indexedDB.open(options.name, options.version);

		request.addEventListener('upgradeneeded', () => {
			const db = request.result;

			for (const table of options.tables) {
				if (!db.objectStoreNames.contains(table)) {
					db.createObjectStore(table, {keyPath: 'id', autoIncrement: true});
				}
			}
		});

		request.addEventListener('success', () => {
			dbRef.current = request.result;

			setIsConnecting(false);
			setIsReady(true);
		});

		request.addEventListener('error', () => {
			console.error('Failed to connect to IndexedDB', request.error);

			setIsConnecting(false);
			setIsReady(false);
		});
	}, [options.name, options.version, options.tables]);

	const getTransaction = useCallback(
		(tableName: TTables[number], mode: IDBTransactionMode) => {
			if (!dbRef.current) {
				throw new Error('IndexedDB is not connected or not initialized');
			}

			return dbRef.current.transaction(tableName, mode).objectStore(tableName);
		},
		[],
	);

	const put = useCallback(
		<TValue extends Record<string, unknown>>(tableName: TTables[number], value: TValue) =>
			new Promise<IDBValidKey | null>((resolve, reject) => {
				try {
					const store = getTransaction(tableName, 'readwrite');
					const request = store.put(value);

					request.addEventListener('success', () => {
						resolve(request.result);
					});

					request.addEventListener('error', () => {
						reject(request.error as Error);
					});
				} catch (error) {
					reject(error as Error);
				}
			}),
		[getTransaction],
	);

	const get = useCallback(
		<TValue>(tableName: TTables[number], id: number) =>
			new Promise<TValue>((resolve, reject) => {
				try {
					const store = getTransaction(tableName, 'readonly');
					const request = store.get(id);

					request.addEventListener('success', () => {
						resolve(request.result as TValue);
					});

					request.addEventListener('error', () => {
						reject(request.error as Error);
					});
				} catch (error) {
					reject(error as Error);
				}
			}),
		[getTransaction],
	);

	const remove = useCallback(
		(tableName: TTables[number], id: number) => {
			try {
				const store = getTransaction(tableName, 'readwrite');
				store.delete(id);

				return id;
			} catch (error) {
				console.error('Failed to delete value from IndexedDB', error);

				return null;
			}
		},
		[getTransaction],
	);

	useEffect(() => {
		if (!dbRef.current) {
			init();
		}
	}, [init]);

	return {
		isConnecting,
		isReady,
		put,
		get,
		remove,
	};
};
