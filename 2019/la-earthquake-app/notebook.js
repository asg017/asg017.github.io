// URL: https://beta.observablehq.com/d/a9f353b5513cc8d3
// Title: ShakeCityLA - the new earthquake alert app for Los Angeles - is an untested app that consistently tracks your location
// Author: Alex Garcia (@asg017)
// Version: 171
// Runtime version: 1

const m0 = {
  id: "a9f353b5513cc8d3@171",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# ShakeCityLA - the new earthquake alert app for Los Angeles - is an untested app that consistently tracks your location
---
[Alex Garcia](https://iamprettydamn.cool)`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`ShakeCityLA is the new earthquake alert app released by the City of Los Angeles that sends alerts
to users when the USGS (U.S. Geological Survey) detects a 5.0+ earthquake in the Los Angeles area. This long 
awaited service has been championed by 
[Mayor Eric Garcetti](https://twitter.com/MayorOfLA/status/1080545565283213313), 
[Senator DianneFeinstein](https://twitter.com/SenFeinstein/status/1080585612959330306), and other officals across California.

However, as shown in a now-deleted repository of the android code making up the app, the app itself is untested,
lies in its Terms of Use about location tracking, and contains many security issues that could expose user data
such as their location. 

This post will be split into two parts: the first part will go over exactly what is wrong with the app - how 
your location is tracked and where that data is stored, who made the app and the mistakes they made, and how
the app is untested and unreliable as it is today. The second part will be a technical deep-dive in how the 
entire system works, what tools and API's are used, and some comments on the quality of the product. I encourage
everyone to read the first part to understand why this app is dangerous, and the second part to people who want
to know a little more about the technical aspect of how ShakeCity LA works.`
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
p,h1{max-width: 100%;}
body{font-family: 'Georgia', serif;line-height:1.75rem;}
blockquote {border-left: 1px solid #aac;padding-left: 24px; font-style:italic;}
.highlight { background-color:#ffa; padding:3px; }
code {background-color:#eee; padding:2px 5px; border-radius:2px;}

#who-container {text-align:center;}
#who-title{color:#444;}
#who-bottom{max-width:600px;margin:0 auto; font-size:.9rem;line-height:1rem;}
`
)})
    }
  ]
};

const notebook = {
  id: "a9f353b5513cc8d3@171",
  modules: [m0]
};

export default notebook;
