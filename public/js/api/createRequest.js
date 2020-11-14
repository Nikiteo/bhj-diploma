/**
 * Основная функция для совершения запросов
 * на сервер.
 */

const createRequest = (options) => {
    try {
        const xhr = new XMLHttpRequest();
        let url = options.url;
        const formData = new FormData(); 
    
        if (options.method === 'GET') {
            for (let attribute in options.data) {
                url += `&${attribute}=${options.data[attribute]}`
            }
            url = url.replace('&', '?');
        }
        else {
            for (let attribute in options.data) {
                formData.append(attribute, options.data[attribute])
            }
        }
    
        if (options.headers) {
            for (header in options.headers) {
                xhr.setRequestHeader(header, options.headers[header]);
            }
        }
    
        xhr.open(options.method, url);
        xhr.withCredentials = true;
        
        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                options.callback(null, JSON.parse(xhr.response));
            }
    
        });

        xhr.send(formData);

    } catch (e) {
        options.callback(e, null);
    }
};
