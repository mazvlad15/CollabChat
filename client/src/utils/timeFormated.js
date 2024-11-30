const timeFormat = (message) => {
    return `${new Date(message.createdAt).getHours()}:${new Date(message.createdAt).getMinutes().toString().padStart(2, '0')}`;
}

export default timeFormat;