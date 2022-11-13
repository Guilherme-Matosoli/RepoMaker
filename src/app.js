const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');


async function LessGo(){

    //Login Information Questions

    console.log('\nType your email (GitHub account): ');
    const Email = readlineSync.question('');
    //const Email = your email (faster)

    console.log('\nType your password (GitHub account to): ');
    const Password = readlineSync.question('');
    //const Password = your password (faster)

    //End of Login Information Questions

    const LoginURL = `https://github.com/login?return_to=https%3A%2F%2Fgithub.com%2FGuilherme-Matosoli%3Ftab%3Drepositories`

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(LoginURL);

    //Puppeteer login GitHub
    await page.type('[id="login_field"]', Email);
    await page.type('[id="password"]', Password);
    await page.click('[type="submit"]');
    //End of Puppeteer Login Github

    await page.waitForNavigation();


    //Repository informations
    console.log('\nType your repository name');
    const RepoName = readlineSync.question('');

    console.log('\nYour repository is private? (y/n) ')
    const RepoPriv = readlineSync.question('');
    //End of Repository informations


    const NewRepoURL = 'https://github.com/new';
    await page.goto(NewRepoURL);
    await page.waitForTimeout(2000);
    
    //Set repository name and privacy
    await page.type('[id="repository_name"]', RepoName);
    RepoPriv == 'y' ? await page.click('[value="private"]') : false;
    await page.waitForTimeout(2000);
    //End of Set repository name and privacy

    //Click to create repository
    await page.click('[data-disable-with="Creating repository&hellip;"]');

    await page.waitForNavigation();

    //Get the git link
    const gitLink = await page.evaluate(() =>{
        return document.querySelector('[data-targets="git-clone-help.helpTexts"]').textContent;
    })

    //Write the git link
    console.log(`\nUse: git remote add origin ${gitLink}`);


    await browser.close();

};

LessGo();