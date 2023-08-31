import * as qs from "qs";
import axios from "axios";
import router from "@/router";
import { alert, confirm, toast } from "amis";
import copy from "copy-to-clipboard";
import request from '@/request'
const normalizeLink = (to) => {
  if (/^\/api\//.test(to)) {
    return to;
  }
  to = to || "";
  const location = window.location;
  if (to && to[0] === "#") {
    to = location.pathname + location.search + to;
  } else if (to && to[0] === "?") {
    to = location.pathname + to;
  }
  const idx = to.indexOf("?");
  const idx2 = to.indexOf("#");
  let pathname = ~idx
    ? to.substring(0, idx)
    : ~idx2
    ? to.substring(0, idx2)
    : to;
  const search = ~idx ? to.substring(idx, ~idx2 ? idx2 : undefined) : "";
  const hash = ~idx2 ? to.substring(idx2) : "";
  if (!pathname) {
    pathname = location.pathname;
  } else if (pathname[0] != "/" && !/^https?:\/\//.test(pathname)) {
    const relativeBase = location.pathname;
    const paths = relativeBase.split("/");
    paths.pop();
    let m;
    while ((m = /^\.\.?\//.exec(pathname))) {
      if (m[0] === "../") {
        paths.pop();
      }
      pathname = pathname.substring(m[0].length);
    }
    pathname = paths.concat(pathname).join("/");
  }
  return pathname + search + hash;
};

const updateRoute = (location, replace) => {
  if (location === "goBack") {
    return router.go(-1);
  }
  if (replace) router[replace ? "replace" : "push"](normalizeLink(location));
};

const amisEnv = {
  enableAMISDebug: true,
  isPreview: false,
  session: "global",
  updateLocation: updateRoute,
  isCurrentUrl: (to) => {
    const link = normalizeLink(to);
    const location = window.location;
    let pathname = link;
    let search = "";
    const idx = link.indexOf("?");
    if (~idx) {
      pathname = link.substring(0, idx);
      search = link.substring(idx);
    }
    if (search) {
      if (pathname !== location.pathname || !location.search) {
        return false;
      }
      const query = qs.parse(search.substring(1));
      const currentQuery = qs.parse(location.search.substring(1));
      return Object.keys(query).every(
        (key) => query[key] === currentQuery[key]
      );
    } else if (pathname === location.pathname) {
      return true;
    }
    return false;
  },
  fetcher: ({ url, method, data, config, headers }) => {
    config = config || {};
    config.headers = config.headers || {};
    config.withCredentials = true;
    if (config.cancelExecutor) {
      config.cancelToken = new axios.CancelToken(config.cancelExecutor);
    }
    config.headers = headers || {};
    config.method = method;
    if (method === "get" && data) {
      config.params = data;
    } else if (data && data instanceof FormData) {
    } else if (
      data &&
      typeof data !== "string" &&
      !(data instanceof Blob) &&
      !(data instanceof ArrayBuffer)
    ) {
      data = JSON.stringify(data);
      config.headers["Content-Type"] = "application/json";
    }
    data && (config.data = data);
    return request(url ,config );
  },
  isCancel: (e) => axios.isCancel(e),
  alert,
  notify: (type, msg) => {
    toast[type]
      ? toast[type](msg, type === "error" ? "系统错误" : "系统消息")
      : console.warn("[Notify]", type, msg);
    console.log(msg);
  },
  confirm,
  copy: (contents, options = {}) => {
    const ret = copy(contents, options);
    ret &&
      (!options || options.shutup !== true) &&
      toast.info("内容已拷贝到剪切板");
    return ret;
  },
  jumpTo: (to, action, ctx) => {
    if (amisEnv.isPreview) {
      toast.info("预览模式禁止跳转");
    } else {
      router.push(to.substring(1));
    }
  },
};
export default amisEnv;
