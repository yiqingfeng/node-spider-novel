/**
 * @description 日志相关处理
 */
const {
    configure,
    getLogger,
} = require('log4js');

configure({
    appenders: {
        out: {
            type: 'console',
        },
        network: {
            type: 'file',
            filename: 'logs/network.log'
        }
    },
    categories: {
        default: {
            appenders: ['out'],
            level: 'trace'
        }
    }
});

const typeMaps = {

};

const logger = getLogger('network');
logger.error('test');


exports.network = ({message, type = 1}) => {
    if (!typeMaps[type]) return;
    const logger = getLogger('network');
    logger[typeMaps[type]](message);
};
