const addPeriodToString = (string) => {
    if (typeof string === 'string') {
        const punctuation = new Set(['.', ',', ':', '!', '?']);
        if (punctuation.has(string.substr(-1))) {
            return string;
        }
        return `${string}.`;
    }
    return string;
};

const getErrorMessages = (error) => {
    if (typeof error === 'object') {
        // For form validation from DRF, comes back as an object of fields:errors
        if (error.response && error.response.data && typeof error.response.data === 'object') {
            const error_msg = error.response.data;
            if(!error_msg.field_errors)
                return error.response.data.developer_message;
            return Object.keys(error_msg.field_errors).map(
                key => addPeriodToString(`${error_msg.field_errors[key].developer_message}`)
            )[0];
        }
        // Some request responses contain a .message, as well as JS errors let's
        // try to use the request data or message before the or base JS errors check
        const message = (
            error.response && (error.response.data || error.response.message)
        ) || error.message || error;
        return [addPeriodToString(message)];
    }
    if (typeof error === 'string') {
        return [addPeriodToString(error)];
    }
    return ['Unknown error.'];
};

export {
    getErrorMessages,
    addPeriodToString,
};