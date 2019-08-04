
export const actionTypes = {
  setUADevice: 'SET_DEVICE_BY_USER_AGENT',
  resolutionKind: 'SET_DEVICE_BY_RESOLUTION',
};

export const setUADevice = ({ isMobile, isBot }) => ({
  type: actionTypes.setUADevice,
  payload: { isMobile, isBot },
});


export const resolutionKind = (
  payload: {
    pagination: number,
    resolutionKind: string,
    isTouch: boolean,
  }
) => ({
  type: actionTypes.resolutionKind,
  payload,
});
