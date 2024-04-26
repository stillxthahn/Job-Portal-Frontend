export const date = new Date(dateString : string);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        if (diffHours === 0) {
            const diffMinutes = Math.floor(diffMs / (1000 * 60));
            return diffMinutes + " minutes ago";
        }
        return diffHours + " hours ago";
    }

    return diffDays + (diffDays === 1 ? " day ago" : " days ago");
}