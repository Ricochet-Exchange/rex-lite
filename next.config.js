/** @type {import('next').NextConfig} */
// const { i18n } = require('./next-i18next.config');
const nextConfig = {
	images: {
		unoptimized: true,
	},
	reactStrictMode: true,
	swcMinify: true,
	// i18n,
	// output: 'export',
};

module.exports = nextConfig;
