// URL: https://beta.observablehq.com/d/a9f353b5513cc8d3
// Title: The City of Los Angeles paid $300,000 for an untested, unreliable, and vulnerable earthquake alert app
// Author: Alex Garcia (@asg017)
// Version: 611
// Runtime version: 1

const m0 = {
  id: "a9f353b5513cc8d3@611",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# The City of Los Angeles paid $300,000 for an untested, unreliable, and vulnerable earthquake alert app

<div class="byline">January 11th, 2019 - [Alex Garcia](https://iamprettydamn.cool)</div>

---`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`

*Note:* I want to preface this by saying that I am by no means an expert in android, php, or any of the technologies that the ShakeAlertLA app is built on, my assumptions and analysis could be wrong, and I could be looking at non-production code. I will make corrections if anything is wrong or misleading.

---`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`

The City of Los Angeles [spent $300,000](https://www.latimes.com/local/lanow/la-me-quake-warning-challenges-20190104-story.html) for an earthquake alert app that contains several security vulnerabilities, has no tests, and tracks thousands of users' precise location.

<br/>

ShakeAlertLA is a simple - users download the app, consent to location sharing, and they're done. Using the US Geological Survey's new early warning system, the app will send a notification and play an alarm if a predicted > 5.0 magnitude earthquake happens, giving potentially 10's of seconds of warning to thousands of users across Los Angeles County.

<br/>

However, as shown by a now-deleted repository of the app's codebase, there are several alarming features of the Android app and the server that handles the app's features, including the accuracy of the app's location tracking, the potential plaintext passwords and API keys to access the app's database and governement services, and the lack of any tests for the projects features, making the entire app unreliable, unsafe, and a failure of civic tech.

<br/>


<div class="pic">
  <img class="pic-img" src="https://gist.githubusercontent.com/asg017/c223bf40a926ab86ba7838829bfcbcf8/raw/6b36a5d7e563609b899fd444c1e8128420d54da0/client_properties_censored.png" alt="screenshot of the open-source code of the MyShakeLA app that contains passwords other credentials"/>
  <div class="pic-label">Example of a file from the ShakeAlertLA public codebase containing login credentials, including password, to a federal government service</div>
</div>

### Background

<br/>

The City of Los Angeles has an [organization on GitHub](https://github.com/CityofLosAngeles) - a site where users share open-source software projects. In their organization, they have several "repositories" - which are open codebases that show the entire history of a project. 

<br/> 
On January 2nd, this organization had 3 repositories related to the ShakeAlertLA app - one for the Android app codebase, another for the iOS app codebase, and another for a server that handled database and the alert features. That day, Hunter Owens, a data scientist for the city, tweeted in celebration that the app was live and that the code was open source.

<br/>

The next day, on January 3rd, the Android and iOS repositories were deleted from GitHub, and Owens [deleted his tweet](https://twitter.com/hunter_owens/status/1080548642698588161). On January 8th, the server repository was deleted.

<br/>

A backup of the now-deleted Android and server code were made, revealing all of the issues listed below. Keep in mind, all of this code and snippets were once available for anyone to view for free on GitHub. This did not come from some breach or decompiling process, it was all freely available. 

<br/>
`
)})
    },
    {
      name: "credentials",
      inputs: ["md"],
      value: (function(md){return(
md`
### Leaked Credentials 
</br>

In the server codebase, there are files that appear to contain passwords and login credentials federal government tools and the database that stores all ShakeAlertLA users' location data. Normally, users never see what code a server runs, so it makes sense that these files are where they are. However, it is extremely dangerous to leave sensitive passwords when code is posted to GitHub. The code repository containing these sensitive keys were publicly up on GitHub for quite some time before being taken down on January 8th.  

<br/>

<div class="pic" id="db-img">
  <img class="pic-img" src="https://gist.githubusercontent.com/asg017/c223bf40a926ab86ba7838829bfcbcf8/raw/6b36a5d7e563609b899fd444c1e8128420d54da0/msql_credentials_censored.png" alt="screenshot of open-source code of the MyShakeLA app that contains  a password and login information for the ShakeAlertLA database."/>
  <div class="pic-label">The GitHub repo contained this potential login information to the database that contains for the location of thousands of users.</div>
</div>

Side note: I didn't test to see if these credentials worked because that would've been [a felony](https://en.wikipedia.org/wiki/Computer_Fraud_and_Abuse_Act).

<br/>
`
)})
    },
    {
      name: "security",
      inputs: ["md"],
      value: (function(md){return(
md`
### Security Vulnerabilities
<br/>
The code that interacts with the database is open to [SQL injection attacks](https://en.wikipedia.org/wiki/SQL_injection). An endpoint that handles certain business logic takes in raw user input, does not sanitize it in any way, and is on an open endpoint which requires no authentication. It fails to use any sort of [prepared statements](https://dev.mysql.com/doc/refman/8.0/en/c-api-prepared-statements.html), which is considered standard across the software engineering industry.

<br/>

Good news, from the way that the server was setup, there seemed to be little possibility of leaking user information, as there was no endpoint that returned data. 

<br/>
Bad news, a malicious actor could have used this exploit to insert fake data or delete the entire database with just a few lines of code.

<div class="pic" id="db-img">
  <img class="pic-img" src="https://imgs.xkcd.com/comics/exploits_of_a_mom.png" alt="xkcd comic that mentions the same exploit that could be used on this app."/>
  <div class="pic-label">A [xkcd comic](https://xkcd.com/327/) that mentions the same vulnerability that could be exploited on ShakeAlertLA.</div>
</div>


There's also another potential instance of database credentials leaking, too.

<div class="pic" id="db-img">
  <img class="pic-img" src="https://gist.githubusercontent.com/asg017/c223bf40a926ab86ba7838829bfcbcf8/raw/5c0f4f1a7feb34852c9232a8aa9024017a2d6ff7/db_connection_censored.png" alt="Screenshot of the code that contains potential credentials to the database."/>
  <div class="pic-label">A snippet of the open-source code that may have leaked credentials to the ShakeAlertLA database. (Note: the lengths of the username/password were changed to avoid accidental leakage)</div>
</div>


<br/>`
)})
    },
    {
      name: "location",
      inputs: ["md"],
      value: (function(md){return(
md`
### Location Privacy

<br/>

The app asks for the "fine" location permission, opposed to "coarse" location permission. The reason the app asks for your permission is because the application can calculate how strong an earthquake will be given a user's location, based on how far away the epicenter is and how strong the seismic waves are.

<br/>

However, the "fine" location permission gives extremely accurate location data - up to a few feet, which is enough to place someone in a specific room of their home. The "coarse" location, on the other hand, is only accurate to about a ~1 mile radius. With earthquakes, where they can be felt 10's of miles away, "coarse" location would have worked just fine, without the privacy issue.[*](#footnotes)

</br>
One common practice when dealing with location data is to "fuzzy" the longitude-latitude numbers before storing them. For example, instead of storing the longitude/latitude values with 6 decimal points, which is accurate enough to place Donald Trump at his [desk in the Oval Office](https://www.google.com/maps/@38.897362,-77.037405,21z), they could instead store 3 decimal points, which could be anywhere in a [~1/2 mile radius](https://en.wikipedia.org/wiki/Decimal_degrees#Precision). ShakeAlertLA does no such location fuzzing, and stores location as accurately as they device provides.


<div class="pic">
  <img class="pic-img" src="https://gist.githubusercontent.com/asg017/c223bf40a926ab86ba7838829bfcbcf8/raw/206299c5ad63907b8b48de5a5501bae3696b1a79/location-fuzzy-example.png" alt=""/>
  <div class="pic-label">The tiny yellow dot (shown by the red arrow) demonstrates how accurate an un-fuzzied location could be from a mobile device, which is what ShakeAlertLA uses. The bigger purple square shows what a fuzzied location could do.</div>
</div>

<br/>
`
)})
    },
    {
      name: "android",
      inputs: ["md"],
      value: (function(md){return(
md`
### Android Problems
<br/>

In the Android codebase, there are no tests at all. Software engineering projects typically have some way of verifying their code works the way they want - for example, writing a test for code that converts miles to kilometers, or tests that make sure your app looks the way its supposed to, or tests that verifies your app won't crash when something unexpected happens. 

<br/>

But this app has none of that, meaning all of the features - including the alert system - may not work at all. Of course, tests don't mean that the app will be bug-free, but it's the first step that software engineers should have if they want to have any reliability whatsoever. This means the development team behind ShakeAlertLA can easily accidentally break something and not notice until an earthquake happens.

<br/>

Also, an early version of the Android app had plans to integrate Twitter login into the app - but was eventually scrapped. However, the Twitter API keys and secret keys, which are password-like tokens not meant for public use, were still in the codebase and were open to the public before the repository was removed from GitHub.

<br/>

<div class="pic">
  <img class="pic-img" src="https://gist.githubusercontent.com/asg017/c223bf40a926ab86ba7838829bfcbcf8/raw/7bbc80beaaaf3f2f54af149f96f7791768d7c48d/android-twitter-censored.png" alt="screenshot of open-source code of the MyShakeLA app that contains  a Twitter API keys that should have remained secret."/>
  <div class="pic-label">Snippet of the ShakeAlertLA Android code that contains commented-out lines of un-used Twitter API secrets.</div>
</div>

`
)})
    },
    {
      name: "colworx",
      inputs: ["md"],
      value: (function(md){return(
md`
### Colworx Tech Inc.
<br/>
With all of these mistakes and dangerous practices, who is to blame? The City of Los Angeles didn't write the application themselves, they [contracted AT&T](https://about.att.com/story/2019/los_angeles_shakealertla.html) to build it.

<br/>

However, according to the history of the Android and server codebases, it was a company by the name of Colworx that wrote the actual code.

<br/>

[Colworx](http://colworx.com/) is an obscure technology company with an interesting history. The two employees of Colworx that contributed to the codebase are Mike Boyle, who is VP Operations, and an employee with the username samsidd on GitHub (no name available).

<br/>

Nearly two decades ago, Mike Boyle co-founded a company called Encompass TeleServices in Oregon, that operated a call center for TMobile. The [company went backrupt](https://www.tmcnet.com/usubmit/2007/04/05/2466626.htm), 300 employees lost their job, and Boyle ended up in [legal battles](https://casetext.com/case/encompass-teleservices-2) with the both a shareholder of the company and the previous CEO. Boyle decided to change the name of the company to a Nevada-registered company that his wife was President of, saying that it was too difficult to recruit employees under the name "Encompass" due to the several controversies and bankruptcy.

<br/>
That company's name? Colworx.

<br/>
It's hard to say exactly how Colworx is structured or who works for them - they are now based in Manhattan Beach, California, and seem to only have a small handful of employees. But one thing is clear - the incompetence of the work done by Colworx employees has created an unreliable and insecure application that thousands of Los Angelenos trust and rely on - all for the price of $300,000 + $47,000 per year.

<br/>
`
)})
    },
    {
      name: "conclusion",
      inputs: ["md"],
      value: (function(md){return(
md`
### Conclusion
<br/>
If anyone from the city is reading this, these are the questions I have:

- Were the USGS passwords and database credentials that were in the GitHub repositories the actual credentials used in production?
- What security review/processes did the ShakeAlertLA application go through?
- Will location fuzzying be used in future iterations of the application? 
- What is the process for open-sourcing code for the CityOfLosAngeles GitHub account? Did the people writing the code know it would be open sourced?
- How did Colworx end up working on this application when AT&T worked on the application?
`
)})
    },
    {
      name: "footnotes",
      inputs: ["md"],
      value: (function(md){return(
md`
<br/><br/>
\\* To give the city credit, [they don't keep a history of your location](https://earthquake.lacity.org/shakealertla) - on every location update, they overwrite any previous location data they have from a user. This can be verified from the source code of the ShakeAlertLA server. However, there is no way to delete your location data from the CityOfLA server, and this alone doesn't mean data is 100% secure.
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
p,h1,h2,h3,h4,h5,h6,ul,hr,.byline,.pic{max-width: 800px; margin: 0 auto;}
hr{margin: 22px auto;}
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
    }
  ]
};

const notebook = {
  id: "a9f353b5513cc8d3@611",
  modules: [m0]
};

export default notebook;
