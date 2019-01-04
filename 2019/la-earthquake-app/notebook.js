// URL: https://beta.observablehq.com/d/a9f353b5513cc8d3
// Title: The City of Los Angeles paid $300,000 for an untested, unreliable, and vulnerable earthquake alert app
// Author: Alex Garcia (@asg017)
// Version: 309
// Runtime version: 1

const m0 = {
  id: "a9f353b5513cc8d3@309",
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

Note: This post is broken up in 3 parts: The first part is a general, article-like summary of everything I have found wrong with the ShakeAlertLA app, that's intended for all audiences. The second part goes more in depth than the first, and is a little more technical, and the third part of a fully technical overview of the software engineering practices of the app with the sources for my clains.

---`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`

The City of Los Angeles [spent $300,000](https://www.latimes.com/local/lanow/la-me-quake-warning-challenges-20190104-story.html) for an earthquake alert app that contains several security vulneranbilities, has no tests, and tracks thousands of people's precise location.

<br/>

ShakeAlertLA is a simple app - users download the app, consent to location sharing, and they're done. Then, using the US Geological Survey's new early warning system, the app will send a notification and play an alarm if a predicted >5.0 magnitude earthquake happens, giving a potential 10's of seconds of warning to thousands of users.

<br/>

However, as shown by a now-deleted repository of the app's codebase, there are several alarming features of the Android app and the server that handles the app's features, including the accuracy of the app's location tracking, the plaintext passwords and API keys to access the app's database and governement services, and the lack of any tests for the projects features, making the entire app unreliable, unsafe, and a failure of civic tech.

<br/>


<div class="pic">
  <img class="pic-img" src="https://gist.githubusercontent.com/asg017/c223bf40a926ab86ba7838829bfcbcf8/raw/6b36a5d7e563609b899fd444c1e8128420d54da0/client_properties_censored.png" alt="screenshot of the open-source code of the MyShakeLA app that contains passwords other credentials"/>
  <div class="pic-label">Screenshot of a public file, containing login credentials, including password, to a federal government service</div>
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
It's hard to say exactly how Colworx is structured or who works for them - they are now based in Manhattan Beach, California, and seem to only have a small handful of employees. But one thing is clear - the incompetence of the work done by Colworx employees has created an unreliable and unsecure application that thousands of Los Angelenos trust and rely on - all for the price of $300,000+$47,000 per year.

`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Summary:

- The ShakeCityLA Android app stores your last available location very accurately, but doesn't do long-term tracking
- The server that powers both the Android and iOS app have serious security vulnerabilities that could lead to easy SQL database attacks
- There are multiple leaks of API keys, admin usernames/passwords, and other secrets across the codebases
- The app itself has no tests, and may be unreliable in an actual emergency
- The contractor for this app, Colworx, is most likely responsible for many of these vulnerabilities and incompetence.`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Disclaimer: I'm not an expert
I am by no means an expert in android, php, or any of the technologies that the ShakeAlertLA app is built on, my assumptions and analysis could be wrong, and I could be looking at non-production code. I will try to explain myself as much as I can and cite my sources, and I will correct anything that might be wrong here.

Also, this post does not look into the iOS app - the iOS repository was removed before I could back it up. `
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Part 1: The Sins of ShakeCityLA (Android)

### Location Tracking

On the [city of LA website](https://earthquake.lacity.org/shakealertla) that promotes this app, they explain:

>  What information is being collected from phones with ShakeAlertLA installed?
> -  To receive notifications of earthquakes, you must have Location Services “Always On”. 
<span class="highlight"> As a result, ShakeAlertLA keeps track of the last location of your phone</span> to push out an alert as needed with the expected shaking at that location. When the location is updated, previous information is overwritten. No other information is collected or accessed.


However, in the app’s Terms of Use, they state:

>  PERSONAL INFORMATION. 

> <span class="highlight"> The City does not see, collect, or store any data you enter into the App.</span> Any and all information you enter into the App is stored on your device and not on the City’s website or server. The City is not responsible for any damages resulting from the loss or theft of that information.


... Kindof weird, right? "We don't store any of your data," "we actually store your location." We *could* 
just assume that the Terms of Use has a typo or isn't updated, which would be bad for a GDPR compliant 
application, but it's a small LA-only app so who cares, right? And they can't identify you based on 1 location point, right?

#### Your location is very precise

When you make an Android app, you must ask for permissions that the user can allow or deny - so if your app
requires a user's location, the app has to ask for permission for either \`ACCESS_COARSE_LOCATION\` or \`ACCESS_FINE_LOCATION\`. The exact difference between the two [are complicated](https://developer.android.com/guide/topics/location/strategies), but the \`COARSE\` permissions gives location based on cell towers and WiFi networks and can be ~1 mile inaccurate, while the \`FINE\` permission gives exact
coordinates based on the GPS on your phone - which can be very, very accurate. Your GPS could be finnicky and not give the right location (like lag on Google Maps), but it's not crazy to assume that \`FINE\` permission could be as accurate as placing you inside your room in your house. 

ShakeCityLA has the \`ACCESS_FINE_LOCATION\` permission, which means it can access this precise location. The app itself does no obfuscation or fuzzy-ing of the latitude/longitude before it get uploaded to the server, so your exact location is store (or as exact as your GPS is). Why do they need that precise of a location? They claim that they need to know your location so they can send an alert if an earthquake is happening in your location. Well, even if my location was 1 mile off with with the \`COARSE\` permission, I would still probably get the alert, earthquakes affect a large area. 

#### Good news: It's not tracking you

As far as I can tell, the server does what it says: If you have a pre-existing location saved in their database, it will be over-written on future location updates. Your location is updated only when you enter the Home section of the app (as far as I can tell), and they don't store much - only a unique ID of your device, the latitude/longitude, and your language preference (English/Spanish). No other data is stored, like your email, name, phone number, etc. 

#### Bad news: It totally *could* be tracking you

There's only so much we can tell from the code snippets we have - what if the database that stores your location gets backed up every hour, so the overwrites are meaningless? What if the database-level logic is logging each database update in another separate file? What if the database is breached, and the attacker does a \`SELECT * FROM USERS\` every 10 minutes to track all users of the app? This is a total weak point of the app, and the fact that the location is very accurate makes it even more absurd.

`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`### Security Vulnerabilities

As far as individual user data, it seems secure - there are no endpoints and directly expose user data, only endpoints that take in data. Except for the possibility of the City of LA database being compromised, your location is mostly safe.

However, as a service as a whole, messy developer practices at the fault of 
Colworx, the contractor in charge of the creating this service, has lead to severe vulnerabilities that could cause.

#### Exposed secrets
For one, in the Android app, it seems that an early version had a "Login with Twitter" feature, which was soon discontinued. But, all they did was comment out the lines that container the raw API keys (kindof like a password) instead of actually deleting the lines. It looks like this:
\`\`\`java
//    private static final String TWITTER_KEY = "6xcvlxcvxclvjxcvB";    
//    private static final String TWITTER_SECRET = "AszdvlzkdvjzlkvjldkvjslvkjkjB";
 
\`\`\`


`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`### UnTested Code

In software engineering, testing your code is important - It ensure that your new changes in the future 
won't break old code and gives you (some) peace of mind that your app is running the way it's supposed to. There are many ways to measure how well tested your code is, and one of those metrics is "test coverage" - what percent of lines of your code is tested. 100% test coverage means every single line of your code is involved in a test. The higher the coverage, the better. 

Now, 100% test coverage is nearly impossible for most software, and some big tech company aim from anything from 50%-80% coverage depending on the software and the requirements.

So, what's ShakeAlertLA's test coverage? 0%.

In the entire Android app, there are only 2 tests: one that's a built-in test for all Android apps, and another that tests "2 + 2 = 4". All services this app offers, from registering your device in their database, from 
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## The Technical Piece

### Overview

The code for CityShakeLA (or at least, what was open-sourced) was in 3 repositories: 1) for the Android app, 2) for the iOS app, and 3) for the backend Java code.

The Android and iOS repositories were deleted sometime in the morning of Jan 3rd, 2018, and, as of 3pm of Jan 3rd, the Java backend repo is still live. I was able to backup the Android repo before it was deleted, but the iOS one is gone forever.

From a high level, this is how the app works:

1. Using the Android or iOS app, a user's device is registered in the City of LA's database via a Java-based REST server, storing the device ID and location.
2. 

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
  id: "a9f353b5513cc8d3@309",
  modules: [m0,m1]
};

export default notebook;
