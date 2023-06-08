const PERMISSIONS_LIST = {
    Admin: {
      canAccess: ['admin', 'users', 'posts'],
      canRetrieveAll: ['users', 'posts'],
      canEditAll: ['users', 'posts']
    },
    User: {
      canAccess: ['users', 'posts'],
      canRetrieveOwn: ['users', 'posts'],
      canEditOwn: ['users', 'posts'],
      canViewOtherProfiles: ['users']
    }
  }
  
  module.exports = PERMISSIONS_LIST;
  
  