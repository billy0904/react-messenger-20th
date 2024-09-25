// 시간 포맷
export const currentTime = () => {
    return new Date().toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
};