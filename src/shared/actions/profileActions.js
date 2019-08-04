export const actionTypes = {
  saveProfile: 'SAVE_PROFILE',
};


export const saveProfile = data => ({
  type: actionTypes.saveProfile,
  payload: data,
});
