const trImg = require('../../../../../public/chatroom/assets/transparent.png');

const parseEmojiStr = (str: string) => {
  const patt = /\[emoji_([a-z0-9]{5})\]/g;
  const res = str.replace(patt, (match, code) => {
    return `<img src='${trImg}' class='emojione _${code}'>`;
  });
  return res;
};

/** 带 [emoji_xxxxx] 的字符串转换成表情 */
export const contentShow = (content: string) => {
  return parseEmojiStr(content).replace(/\n/g, '<br>');
};

/** 表情转换成 [emoji_xxxxx] 用于发送给后端 */
export const innerHTML2STR = (str: string) => {
  return str.replace(/<img src="([\S]+)" class="emojione _([0-9a-z]{5})">/g, (match, src, code) => {
    return `[emoji_${code}]`;
  });
};

export const EmojiNames = [
  '_1f620',
  '_1f60a',
  '_1f60c',
  '_1f60d',
  '_1f60e',
  '_1f60f',
  '_1f61a',
  '_1f61b',
  '_1f61c',
  '_1f61d',
  '_1f61e',
  '_1f61f',
  '_1f62a',
  '_1f62b',
  '_1f62c',
  '_1f62d',
  '_1f62e',
  '_1f62f',
  '_1f600',
  '_1f601',
  '_1f602',
  '_1f603',
  '_1f604',
  '_1f605',
  '_1f606',
  '_1f607',
  '_1f608',
  '_1f609',
  '_1f610',
  '_1f611',
  '_1f612',
  '_1f613',
  '_1f614',
  '_1f615',
  '_1f616',
  '_1f617',
  '_1f618',
  '_1f619',
  '_1f60b',
  '_1f621',
  '_1f622',
  '_1f623',
  '_1f624',
  '_1f625',
  '_1f626',
  '_1f627',
  '_1f628',
  '_1f629',
  '_1f630',
  '_1f631',
  '_1f632',
  '_1f633',
  '_1f634',
  '_1f635',
  '_1f636',
  '_1f637',
  '_1f638',
  '_1f639',
  '_1f640',
  '_1f641',
  '_1f642',
  '_1f643',
  '_1f644',
  '_1f910',
  '_1f911',
  '_1f912',
  '_1f913',
  '_1f914',
  '_1f915',
  '_1f917',
  '_1f920',
  '_1f923',
  '_1f924',
  '_1f925',
  '_263a1',
  '_26391'
];
