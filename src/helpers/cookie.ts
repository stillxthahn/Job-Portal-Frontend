export function getCookie(cname: string) {
	const name = cname + "=";
	const ca = document.cookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0)=== ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length);
		}
	}
	return null || "";
}

export function setCookie(cname : string, cvalue : string, exdays : number) {
	const d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	const expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

export function deleteCookie(cname: string) {
	document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
}

export function deleteAllCookies() {
	const cookies = document.cookie.split(";");
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i];
		const eqPos =cookie.indexOf("=");
		const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
		document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"	
	}
}