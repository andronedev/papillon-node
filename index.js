const express = require('express');
const app = express();
const port = process.env.PORT || 6858;
var request = require('request');

var cors = require('cors');
app.use(cors());

const srv = 'http://127.0.0.1:21727';
const loginURL = srv + "/auth/login";
const ql = srv + "/graphql";

app.get('/', (req, res) => {
    res.send('Parameters are missing');
});

app.get('/auth', (req, res) => {
    let url = req.query.url;
    let username = req.query.username;
    let password = req.query.password;
    let cas = req.query.cas;

    let options = {
    'method': 'POST',
    'url': loginURL,
    'headers': {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 2b6f3e44-caaa-4035-8073-6cf5842fd6e7'
    },
    body: JSON.stringify({
        "url": url,
        "username": username,
        "password": password,
        "cas": cas
    })

    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
        res.send(response.body);
    });
});

app.get('/user', (req, res) => {
    let token = req.query.token;

    var options = {
    'method': 'POST',
    'url': ql,
    'headers': {
        'Content-Type': 'application/json',
        'Token': token
    },
    body: JSON.stringify({
        query: `{
        user {
            name
            establishmentsInfo {
                name
                logoID,
                city,
                website
            }
            avatar
            studentClass {
                name
            }
            groups {
                name
            }
        }
    }`,
        variables: {}
    })
    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
        res.send(response.body);
    });
})

app.get('/edt', (req, res) => {
    let token = req.query.token;
    let from = req.query.from;

    var options = {
    'method': 'POST',
    'url': ql,
    'headers': {
        'Content-Type': 'application/json',
        'Token': token
    },
    body: JSON.stringify({
        query: `{
        timetable(from: "${from}") {
            subject
            teacher
            status
            color
            isCancelled
            room
            from
            to
        }
    }`,
        variables: {}
    })
    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
        res.send(response.body);
    });
})

app.get('/hw', (req, res) => {
    let token = req.query.token;
    let from = req.query.from;

    var options = {
    'method': 'POST',
    'url': ql,
    'headers': {
        'Content-Type': 'application/json',
        'Token': token
    },
    body: JSON.stringify({
        query: `{
        homeworks(from: "${from}") {
            id
            description
            htmlDescription
            subject
            color
            files {
                id
                name
                url
            }
        }
    }`,
        variables: {}
    })
    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
        res.send(response.body);
    });
})

app.get('/marks', (req, res) => {
    let token = req.query.token;

    var options = {
    'method': 'POST',
    'url': ql,
    'headers': {
        'Content-Type': 'application/json',
        'Token': token
    },
    body: JSON.stringify({
        query: `{
        marks {
            subjects {
                name
                averages {
                    student
                    studentClass
                    min
                    max
                }
                color
                marks {
                    id
                    title
                    value
                    scale
                    average
                    coefficient
                    min
                    max
                    date
                }
            }
        }
    }`,
        variables: {}
    })
    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
        res.send(response.body);
    });
})

app.get('/evaluations', (req, res) => {
    let token = req.query.token;

    var options = {
    'method': 'POST',
    'url': ql,
    'headers': {
        'Content-Type': 'application/json',
        'Token': token
    },
    body: JSON.stringify({
        query: `{
        evaluations {
            name
            color
            evaluations {
                id
                name
                date
                coefficient
                levels {
                    name
                    value {
                        short
                        long
                    }
                    prefixes
                }
            }
        }
    }`,
        variables: {}
    })
    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
        res.send(response.body);
    });
})

app.get('/files', (req, res) => {
    let token = req.query.token;

    var options = {
    'method': 'POST',
    'url': ql,
    'headers': {
        'Content-Type': 'application/json',
        'Token': token
    },
    body: JSON.stringify({
        query: `{
        files {
            id
            time
            subject
            url
        }
    }`,
        variables: {}
    })
    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
        res.send(response.body);
    });
})

app.get('/news', (req, res) => {
    let token = req.query.token;

    var options = {
    'method': 'POST',
    'url': ql,
    'headers': {
        'Content-Type': 'application/json',
        'Token': token
    },
    body: JSON.stringify({
        query: `{
        infos {
            id
            date
            title
            author
            content
            htmlContent
            files {
                id
                name
                url
            }
        }
    }`,
        variables: {}
    })
    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
        res.send(response.body);
    });
})

app.get('/absences', (req, res) => {
    let token = req.query.token;

    var options = {
    'method': 'POST',
    'url': ql,
    'headers': {
        'Content-Type': 'application/json',
        'Token': token
    },
    body: JSON.stringify({
        query: `{
        absences {
            absences {
                id
                from
                to
                justified
                solved
                hours
                reason
            }
            delays {
                id
                date
                justified
                solved
                justification
                minutesMissed
                reason
            }
            punishments {
                id
                date
                giver
                reason
                circumstances
            }
            other {
                id
                kind
                date
                giver
                comment
                subject
            }
        }
    }`,
        variables: {}
    })
    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
        res.send(response.body);
    });
})

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});