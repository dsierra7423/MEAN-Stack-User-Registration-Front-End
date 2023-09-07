export function test() {
	return null;
}

export function getOS() {
	const { userAgent } = window.navigator;
	const { platform } = window.navigator;
	const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
	const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
	const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
	let os = null;

	if (macosPlatforms.indexOf(platform) !== -1) {
		os = 'MacOS';
	} else if (iosPlatforms.indexOf(platform) !== -1) {
		os = 'iOS';
	} else if (windowsPlatforms.indexOf(platform) !== -1) {
		os = 'Windows';
	} else if (/Android/.test(userAgent)) {
		os = 'Android';
	} else if (!os && /Linux/.test(platform)) {
		os = 'Linux';
	}

	// @ts-ignore
	document.documentElement.setAttribute('os', os);
	return os;
}

export const hasNotch = () => {
	/**
	 * For storybook test
	 */
	const storybook = window.location !== window.parent.location;
	// @ts-ignore
	const iPhone = /iPhone/.test(navigator.userAgent) && !window.MSStream;
	const aspect = window.screen.width / window.screen.height;
	const aspectFrame = window.innerWidth / window.innerHeight;
	return (
		(iPhone && aspect.toFixed(3) === '0.462') ||
		(storybook && aspectFrame.toFixed(3) === '0.462')
	);
};

export const mergeRefs = (refs: any[]) => {
	return (value: any) => {
		refs.forEach((ref) => {
			if (typeof ref === 'function') {
				ref(value);
			} else if (ref != null) {
				ref.current = value;
			}
		});
	};
};

export const randomColor = () => {
	const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger'];

	const color = Math.floor(Math.random() * colors.length);

	return colors[color];
};

export const priceFormat = (price: number) => {
	return price.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
	});
};

export const average = (array: any[]) => array.reduce((a, b) => a + b) / array.length;

export const percent = (value1: number, value2: number) =>
	Number(((value1 / value2 - 1) * 100).toFixed(2));

export const getFirstLetter = (text: string, letterCount = 2): string =>
	// @ts-ignore
	text
		.toUpperCase()
		.match(/\b(\w)/g)
		.join('')
		.substring(0, letterCount);

export const debounce = (func: (arg0: any) => void, wait = 1000) => {
	let timeout: string | number | NodeJS.Timeout | undefined;

	return function executedFunction(...args: any[]) {
		const later = () => {
			clearTimeout(timeout);
			// @ts-ignore
			func(...args);
		};

		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
};

export const dateFormat = (date_invoice: string) => {
	const date = new Date(date_invoice);
	const year = date.getFullYear();
	let month: any = date.getMonth()+1;
	let dt: any = date.getDate();

	if (dt < 10) {
		dt = '0' + dt;
	}
	if (month < 10) {
		month = '0' + month;
	}

	const newDate = `${dt}/${month}/${year}`;

	return newDate;
}

export const dateHourFormat = (date_invoice: string) => {
	const date = new Date(date_invoice);
	const year = date.getFullYear();
	let month: any = date.getMonth()+1;
	let dt: any = date.getDate();
	const hours = date.getUTCHours();
	const minutes = date.getUTCMinutes();


	if (dt < 10) {
		dt = '0' + dt;
	}
	if (month < 10) {
		month = '0' + month;
	}

	const newDate = `${dt}/${month}/${year} ${hours}:${minutes} UTC`;

	return newDate;
}

export const getToken = (dataHash: string) => {
	let token: string | null = '';

	if (dataHash != '' && dataHash.length > 0) {
		const splitData: any = (dataHash.split('&'));

		const access_token = (splitData[0]).includes('access_token') ? (splitData[0]).split('=') : '';
		const scope = (splitData[1]).includes('scope') ? (splitData[1]).split('=') : '';
		const expires_in = (splitData[2]).includes('expires_in') ? (splitData[2]).split('=') : '';
		const token_type = (splitData[3]).includes('token_type') ? (splitData[3]).split('=') : '';
		const state = (splitData[4]).includes('state') ? (splitData[4]).split('=') : '';
		const id_token = (splitData[5]).includes('id_token') ? (splitData[5]).split('=') : '';
		const expiresAt = (expires_in[1] * 1000 + new Date().getTime()).toString();

		localStorage.setItem("access_token", access_token[1]);
		localStorage.setItem("scope", scope[1]);
		localStorage.setItem("expires_in", expires_in[1]);
		localStorage.setItem("expires_at", expiresAt);
		localStorage.setItem("token_type", token_type[1]);
		localStorage.setItem("state", state[1]);
		localStorage.setItem("id_token", id_token[1]);

		token = access_token[1];
	}
	else{
		console.log('No hash data');
		let access_token = localStorage.getItem('access_token');
		let expires_at = localStorage.getItem('expires_at');

		if(access_token != null && access_token != '' && expires_at != null && expires_at != ''){
			const expires_at_number = parseInt(expires_at, 10);
			const noExpired: boolean = new Date().getTime() < expires_at_number;

			token = noExpired ? access_token : null;
		}
		else{
			console.log('No Access token');
			token = null;
		}
	}

	return token;
}

export const helpHttp = () => {
    
    const customFetch = (endpoint: string, options: any) => {
        const defaultHeaders = {
            accept: "application/json"
        }

        const controller = new AbortController();
        options.signal = controller.signal;
        options.method = options.method || "Get"
        options.headers = options.headers ? {...defaultHeaders, ...options.headers} : defaultHeaders
        options.body = JSON.stringify(options.body) || false;

        //console.log(options.method);

        if(!options.body) delete options.body;

        //console.log(options);

        setTimeout(() => {
            controller.abort();
        }, 5000);

        return fetch(endpoint, options)
            .then(res => 
                res.ok 
                    ? res.json() 
                    : Promise.reject({
                        err: true,
                        status: res.status || "00",
                        statusText: res.statusText || "Ocurrio un error"
                    })
                )
            .catch(err => err)
    }

    const get = (url: string, options = {}) => customFetch(url, options);

    const post = (url: string, options = {method:""}) => {
        options.method = "POST";
        return customFetch(url, options);
    }

    const put = (url: string, options = {method:""}) => {
        options.method = "PUT";
        return customFetch(url, options);
    }

    const del = (url: string, options = {method:""}) => {
        options.method = "DELETE";
        return customFetch(url, options);
    }

	const patch = (url: string, options = {method:""}) => {
        options.method = "PATCH";
        return customFetch(url, options);
    }

    return {
        get, post, put, del, patch
    };
}