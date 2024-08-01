const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['flow-subject-bucket.s3.ap-northeast-2.amazonaws.com'],
  },
  webpack: (config, { isServer, dev, webpack }) => {
    if (!isServer) {
      // Modify the asset handling to include hashing in filenames
      config.module.rules.push({
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[name].[hash][ext]',
        }
      });
    }

    // Return the modified config
    return config;
  },
};

export default nextConfig;
