const API_DOMAIN = process.env.VITE_API;

export const get = async (path: string) => {
    const respone = fetch(API_DOMAIN + path, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        mode:   "cors",
    });
    const result = (await respone).json();
    return result;
};

export const post = async (path: string, option: object) => {
    const response = fetch(API_DOMAIN + path, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(option),
        mode: "cors",
    })
    const result = (await response).json();
    return result;
}

export const del = async (path: string) => {
    const respone = await fetch(API_DOMAIN + path, {
        method: "DELETE",
        mode: "cors",
    });
    const result = await respone.json();
    return result;
}

export const patch = async (path: string, options: object) => {
 const response = await fetch(API_DOMAIN + path, {
  method: "PATCH",
  headers: {
   Accept: "application/json",
   "Content-Type": "application/json",
  },
  mode: "cors",
  body: JSON.stringify(options),
 });
    const text = await response.text();
    const result = text ? JSON.parse(text) : null; 
    
 return result;
};

export const put = async (path: string, options = {}) => {
 const response = await fetch(API_DOMAIN + path, {
  method: "PUT",
  headers: {
   Accept: "application/json",
   "Content-Type": "application/json",
  },
  mode: "cors",
  body: JSON.stringify(options),
 });
 const result = await response.json();
 return result;
};





