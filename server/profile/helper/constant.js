export const CONTROLLERS = {
  GET_PROFILE: 'users:getProfile',
  UPDATE_PROFILE: 'users:updateProfile'
};


export const BAD_REQUEST = 400;

export const profileError = {
  PROFILE_NOT_FOUND: {
    code: 'PROFILE_NOT_FOUND',
    message: 'Profile not found'
  },
  PROFILE_UPDATE_FAILED: {
    code: 'PROFILE_UPDATE_FAILED',
    message: 'Profile update failed'
  }
};
