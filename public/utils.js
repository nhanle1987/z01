window.UTILS =  window.UTILS || {
    docReady: (fn) => {
        // see if DOM is already available
        if (document.readyState === "complete" || document.readyState === "interactive") {
            // call on next available tick
            setTimeout(fn, 1);
        } else {
            document.addEventListener("DOMContentLoaded", fn);
        }
    },
    call: async (url, data, method = 'GET', hookFnc) => {
        if (typeof hookFnc === 'function') {
            hookFnc();
        }
        const options = {
            method,
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
              },
        };
        if (method !== 'GET') {
            options.body = JSON.stringify(data);
        }
        return await fetch(url, options);
    },
};
