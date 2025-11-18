import type {Config} from 'vike/types';
import vikePhoton from 'vike-photon/config';
import vikeReact from 'vike-react/config';
import Layout from '../layouts/Layout.js';

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  // https://vike.dev/Layout
  Layout,

  // https://vike.dev/head-tags
  title: 'MingleUp',
  lang: 'ko',
  description: '일상속 자연스러운 만남, 당신의 리듬에 맞춘 MingleUp',
  extends: [vikeReact, vikePhoton],
  prerender: true,
} satisfies Config;
