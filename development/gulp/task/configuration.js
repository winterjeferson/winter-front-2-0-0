const path = '../../';
const allFile = '*.*';

module.exports = {
    development: `${path}development/`,
    homologation: `${path}homologation/`,
    production: `${path}production/`,
    theme: 'theme',
    plugin: 'plugin',
    index: 'index',
    allFile: allFile,
    allFolderFile: `**/${allFile}`,
    assets: 'assets/',
    prefix: 'wf-',
    ip: '127.0.0.1',
    port: '3015',
}