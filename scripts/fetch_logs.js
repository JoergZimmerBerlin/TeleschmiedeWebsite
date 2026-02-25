fetch('https://api.github.com/repos/JoergZimmerBerlin/TeleschmiedeWebsite/actions/runs/22408501066/jobs')
    .then(res => res.json())
    .then(data => {
        const job = data.jobs[0];
        console.log('Job ID:', job.id);
        return fetch(`https://api.github.com/repos/JoergZimmerBerlin/TeleschmiedeWebsite/actions/jobs/${job.id}/logs`, {
            redirect: 'follow'
        });
    })
    .then(res => res.text())
    .then(text => console.log(text.slice(-2000))) // Print last 2000 chars of log
    .catch(err => console.error(err));
