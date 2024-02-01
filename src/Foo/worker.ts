import axios from '@/services/axios';
import { fecthError, getAPIPrefix, getLocalToken, uuid } from '.';

const workercode = () => {
  importScripts(`http://localhost:9000${process.env.publicPath}/lib/js/eventsource.min.js`);

  function fetchEvent(props) {
    const evtSource = new self.EventSourcePolyfill(props.url, props.config || {});
    console.log(34567890, evtSource);
    evtSource.addEventListener('add', (e) => {
      console.log('add', e);
    });
    evtSource.addEventListener('finish', (e) => {
      console.log('finish', e);
      evtSource.close();
    });

    // self.postMessage(
    //   JSON.stringify({
    //     uid: props.uid,
    //     eventRes,
    //   }),
    // );
  }

  function fetchAxiospost(eData) {
    fetch(eData.url, {
      method: 'POST',
      body: JSON.stringify(eData.data),
      headers: eData.config.headers,
    })
      .then((res) => res.json())
      .catch((error) => console.error('Error:', error))
      .then((response) => {
        self.postMessage({
          uid: eData.uid,
          response,
        });
      });
  }

  self.onmessage = function (e) {
    console.log(e);
    if (e.data.type === 'axiospost') {
      fetchAxiospost(e.data);
    }
  };

  self.postMessage('workerResult');
};

let code = workercode.toString();
code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));

const blob = new Blob([code], { type: 'application/javascript' });
const worker_script = URL.createObjectURL(blob);

let workerRef = 0;

let workerInstance: Worker;

if (workerRef === 0) {
  workerInstance = new Worker(worker_script);
  workerRef++;
}
console.log('worker', workerInstance);

// export default workerInstance;

// export const workerAxios = (url, request) => {
//   const { type, url, request } = props;
//   return new Promise((resolve) => {
//     workerInstance.postMessage({
//       type,
//       url,
//       request,
//     });
//   });
// };
export const workerEvent = (url, config) => {
  const uid = uuid();
  return new Promise((resolve) => {
    workerInstance.postMessage({
      type: 'event',
      uid: uid,
      url,
      config,
    });
    // workerInstance.onmessage = (e) => {
    //   const data = JSON.parse(e.data);
    //   if (data.uid === uid) {
    //     // resolve(data.eventRes);
    //   }
    // };
  });
};

export const workerAxios = (url, data, config = {}) => {
  return new Promise((resolve, reject) => {
    const uid = uuid();
    const access_token = getLocalToken();
    const innerConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...config,
    };
    if (access_token) {
      innerConfig.headers.Authorization = access_token;
    } else {
      fecthError(200002); // 强制登录
    }
    const innerurl = getAPIPrefix(url);
    workerInstance.postMessage({
      type: 'axiospost',
      uid: uid,
      url: innerurl,
      data,
      config: innerConfig,
    });
    workerInstance.onmessage = (e) => {
      const eData = e.data;
      if (uid !== eData.uid) return;
      resolve(eData.response);
    };
  });
};
// export default worker_script;
