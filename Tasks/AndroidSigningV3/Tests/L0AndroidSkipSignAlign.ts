import ma = require('vsts-task-lib/mock-answer');
import tmrm = require('vsts-task-lib/mock-run');
import path = require('path');

const taskPath = path.join(__dirname, '..', 'androidsigning.js');
const tr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);

tr.setInput('files', '/some/fake.apk');
tr.setInput('apksign', 'false');
tr.setInput('zipalign', 'false');

process.env['AGENT_VERSION'] = '2.116.0';
process.env['VSTS_TASKVARIABLE_KEYSTORE_FILE_PATH'] = '/usr/lib/login.keystore';
process.env['HOME'] = '/users/test';
process.env['ANDROID_HOME'] = '/fake/android/home';

// provide answers for task mock
const a: ma.TaskLibAnswers = <ma.TaskLibAnswers>{
    checkPath: {
        '/some/fake.apk': true
    },
    findMatch: {
        '/some/fake.apk': [
            '/some/fake.apk'
        ]
    }
};
tr.setAnswers(a);

tr.run();