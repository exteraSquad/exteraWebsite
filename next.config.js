const withNextIntl = require('next-intl/plugin')();

module.exports = withNextIntl({
    webpack: (config) => {
        config.module.rules.push({
            test: /\.md$/,
            use: 'raw-loader',
        });
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
        ],
        dangerouslyAllowSVG: true
    }
});
