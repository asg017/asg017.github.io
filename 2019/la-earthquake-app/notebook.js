// URL: https://beta.observablehq.com/d/a9f353b5513cc8d3
// Title: The City of Los Angeles paid $300,000 for an untested, unreliable, and vulnerable earthquake alert app
// Author: Alex Garcia (@asg017)
// Version: 326
// Runtime version: 1

const m0 = {
  id: "a9f353b5513cc8d3@326",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# The City of Los Angeles paid $300,000 for an untested, unreliable, and vulnerable earthquake alert app

<div class="byline">January 4th, 2019 - [Alex Garcia](https://iamprettydamn.cool)</div>

---`
)})
    },
    {
      inputs: ["message"],
      value: (function(message){return(
message({
  header:'<div style="padding:18px;">This is a work-in-progress! <a href="https://twitter.com/asg_027">Follow me on twitter</a> to find out when this post is complete.',
})
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`

*Note:* I want to preface this by saying that I am by no means an expert in android, php, or any of the technologies that the ShakeAlertLA app is built on, my assumptions and analysis could be wrong, and I could be looking at non-production code. I will try to explain myself as much as I can and I will correct anything that might be wrong here.

---`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`

The City of Los Angeles [spent $300,000](https://www.latimes.com/local/lanow/la-me-quake-warning-challenges-20190104-story.html) for an earthquake alert app that contains several security vulneranbilities, has no tests, and tracks thousands of people's precise location.

<br/>

ShakeAlertLA is a simple - users download the app, consent to location sharing, and they're done. Then, using the US Geological Survey's new early warning system, the app will send a notification and play an alarm if a predicted > 5.0 magnitude earthquake happens, giving a potential 10's of seconds of warning to thousands of users acroos Los Angeles County.

<br/>

However, as shown by a now-deleted repository of the app's codebase, there are several alarming features of the Android app and the server that handles the app's features, including the accuracy of the app's location tracking, the plaintext passwords and API keys to access the app's database and governement services, and the lack of any tests for the projects features, making the entire app unreliable, unsafe, and a failure of civic tech.

<br/>


<div class="pic">
  <img class="pic-img" src="https://gist.githubusercontent.com/asg017/c223bf40a926ab86ba7838829bfcbcf8/raw/6b36a5d7e563609b899fd444c1e8128420d54da0/client_properties_censored.png" alt="screenshot of the open-source code of the MyShakeLA app that contains passwords other credentials"/>
  <div class="pic-label">Example of a file from the ShakeAlertLA public codebase containing login credentials, including password, to a federal government service</div>
</div>

The City of Los Angeles has an [organization on GitHub](https://github.com/CityofLosAngeles) - a site where users share open-source software projects. In their organization, they have several "repositories" - which are open codebases that show the entire history of a project. On January 2nd, this organization had 3 repositories related to the ShakeAlertLA app - one for the Android app codebase, another for the iOS app codebase, And another for a server that handled database and the alert features. That day, Hunter Owens, a data scientist for the city, tweeted in celebration that the app was live and that the code was open sourced.

<br/>

The next day, on January 3rd, the Android and iOS repositories were deleted from GitHub, and Owens [deleted his tweet](https://twitter.com/hunter_owens/status/1080548642698588161).

<br/>

A backup of the now-deleted Android repository reveals many concerning issues with the app itself - for example, there are no tests at all. Software engineering typically have some way of verifying their code works the way they want - for example, writing a test for code that converts miles to kilometers, or tests that make sure your app looks the way its supposed to, or a test that verifies your app won't crash when something unexpected happens. 


<br/>

The third repository that is still up on GitHub



<br/>

<br/>

<br/>

<div class="pic">
  <img class="pic-img" src="https://gist.githubusercontent.com/asg017/c223bf40a926ab86ba7838829bfcbcf8/raw/6b36a5d7e563609b899fd444c1e8128420d54da0/msql_credentials_censored.png" alt="screenshot of open-source code of the MyShakeLA app that contains  a password and login information for the ShakeAlertLA database."/>
  <div class="pic-label">Screenshot of a public file that contains the login information to the database that contains for the location of thousands of users.</div>
</div>

<br/>
But who's fault is this?

<br/>

Well, [Eric Garcetti takes responsibility](https://www.latimes.com/local/lanow/la-me-quake-warning-challenges-20190104-story.html) for "stepping up and doing it",  but AT&T won the contract to build this application. However, according to the history of the Android and server codebases, it was a company by the name of Colworx that wrote the actual code.

<br/>

[Colworx](http://colworx.com/) is an obscure technology company with a questionable history. The two employees of Colworx that contributed to the codebase are Mike Boyle, who is VP Operations, and an employee with the username samsidd on GitHub (no name available).

<br/>

Nearly two decades ago, Mike Boyle co-founded a company called Encompass TeleServices in Oregon, that operated a call center for TMobile. The [company went backrupt](https://www.tmcnet.com/usubmit/2007/04/05/2466626.htm), 300 employees lost their job, and Boyle ended up in [legal battles](https://casetext.com/case/encompass-teleservices-2) with the both a shareholder of the company and the previous CEO. Boyle decided to change the name of the company to a Nevada-registered company that his wife was President of, saying that it was too difficult to recruit employees under the name "Encompass" due to the several controversies and bankruptcy.

<br/>
That company's name? Colworx.

<br/>
It's hard to say exactly how Colworx is structured or who works for them - they are now based in Manhattan Beach, California, and seem to only have a small handful of employees. But one thing is clear - the incompetence of the work done by Colworx employees has created an unreliable and unsecure application that thousands of Los Angelenos trust and rely on - all for the price of $300,000 + $47,000 per year.

`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`---
<div id="who-container">
  <div id="who-title">Who are you?</div>
  <div id="who-bottom">My name is Alex Garcia, I'm a senior at UC San Diego studying Computer Engineering, originally from Los Angeles. Follow me [on Twitter](https://twitter.com/asg_027) for occasional tech-related stuff like this or weird jokes.</div>

</div>`
)})
    },
    {
      name: "style",
      inputs: ["html"],
      value: (function(html){return(
html`<style>
p,h1,h2,h3,h4,h5,h6,ul,.byline,.pic{max-width: 800px; margin: 0 auto;}
body{font-family: 'Georgia', serif;line-height:1.75rem;}
blockquote {border-left: 1px solid #aac;padding-left: 24px; font-style:italic; margin: 0 auto;}
.highlight { background-color:#ffa; padding:3px; }
code {background-color:#eee; padding:2px 5px; border-radius:2px;}
#who-container {text-align:center;}
#who-title{color:#444;}
#who-bottom{max-width:600px;margin:0 auto; font-size:.9rem;line-height:1rem;}
.byline{margin-top:22px;}
.pic {max-width: 600px;margin-bottom:48px;margin-top:22px;}
.pic-img {max-width:600px; margin:0 auto;}
.pic-label {text-align:center;font-style:italic;font-size:.9rem;line-height:1rem;}
#wip {text-align:center;font-size:28px;}
`
)})
    },
    {
      from: "@asg017/messages",
      name: "message",
      remote: "message"
    }
  ]
};

const m1 = {
  id: "@asg017/messages",
  variables: [
    {
      name: "message",
      inputs: ["html","rb"],
      value: (function(html,rb){return(
function*(params={}) {
  let {rainbow=true} = params
  const header = params.header || params.title || params.head;
  const msg = params.msg || params.body || params.message || (typeof params === 'string' && params) || '';
  let container = html`
<div style="color: white; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; font-weight: 750; border-radius:10px; padding:3px; text-align:center;">
<div style="font-size:32px;">${header||''}</div>
<div style="font-size:18px;">${msg}</div>
</div>`
  if(rainbow) {
    let i = 0
    while(true) {
      container.style.backgroundColor = rb(++i/1000)
      yield container
    }
  }
  yield container
}
)})
    },
    {
      name: "rb",
      inputs: ["require"],
      value: (function(require){return(
require('d3-scale-chromatic').then(d=>d.interpolateRainbow)
)})
    }
  ]
};

const notebook = {
  id: "a9f353b5513cc8d3@326",
  modules: [m0,m1]
};

export default notebook;
