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
    const now = new Date();
    const diffInTime = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24)); // 일 단위 차이 계산

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? '오후' : '오전';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const timeString = `${ampm} ${formattedHours}:${minutes < 10 ? '0' : ''}${minutes}`;

    // 날짜 포맷
    if (diffInDays === 0) {
        // 오늘일 경우 시간만 표시
        return timeString;
    } else if (diffInDays === 1) {
        // 어제일 경우
        return `(어제) ${timeString}`;
    } else if (diffInDays === 2) {
        // 그저께일 경우
        return `(그저께) ${timeString}`;
    } else if (diffInDays <= 3) {
        // 3일 전일 경우
        return `(${diffInDays}일 전) ${timeString}`;
    } else {
        // 3일을 넘는 경우 MM/DD 형식으로
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `(${month}/${day}) ${timeString}`;
    }
};