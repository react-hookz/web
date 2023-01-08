export type UsePermissionState = PermissionState | 'not-requested' | 'requested';
/**
 * Tracks a permission state.
 *
 * @param descriptor Permission request descriptor that passed to `navigator.permissions.query`
 */
export declare function usePermission(descriptor: PermissionDescriptor): UsePermissionState;
