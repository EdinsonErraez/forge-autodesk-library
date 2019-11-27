module.exports = {
  base_urls: {
    authentication: '/authentication/v1',
    information: '/userprofile/v1',
  },
  scopes: [
    'user-profile:read',
    'user:read',
    'user:write',
    'viewables:read',
    'data:read',
    'data:write',
    'data:create',
    'data:search',
    'bucket:create',
    'bucket:read',
    'bucket:update',
    'bucket:delete',
    'code:all',
    'account:read',
    'account:write',
  ],
};
