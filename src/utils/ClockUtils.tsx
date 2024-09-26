// 현재 시간 포맷 (상단바)
export const currentTime = () => {
    return new Date().toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
};

// 타임스탬프 포맷
export const formatTime = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? '오후' : '오전';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${ampm} ${formattedHours}:${minutes < 10 ? '0' : ''}${minutes}`;
};