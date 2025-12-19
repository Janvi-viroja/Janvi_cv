// Minimal site script: replace these sample values with your real data
const data = {
  name: 'Janvi Viroja',
  title: 'Bca honers — 3rd year, 6th semester',
  location: 'Baroda, Gujarat',
  email: 'janvip371@gmail.com',
  phone: '',
  about: 'I am a 3rd-year BCS Honors student at Parul University. I enjoy building web applications with a focus on frontend development and modern JavaScript frameworks. I also know C++ and Java and practice Data Structures & Algorithms (DSA).',
  skills: [
    // Frontend
    'HTML5','CSS3','JavaScript (ES6+)','TypeScript','React.js','Next.js',
    // Backend
    'Node.js','Express.js','Python (APIs - basics)',
    // Database / Cloud
    'MongoDB','AWS (basic)',
    // Languages & DSA
    'C++','Java','Data Structures & Algorithms (DSA)'
  ],
  experiences: [
    {title:'Academic Projects and Self-Learning',period:'Ongoing',desc:'Developed personal projects in web development, including REST APIs, e-commerce platforms, and task management apps. Gained proficiency in frontend and backend technologies through self-study and university coursework.'}
  ],
  resume: '', // set to a relative path like 'assets/Resume.pdf' if you add one
  github: 'https://github.com/janvi-viroja',
  linkedin: 'https://www.linkedin.com/in/janvi-patel-a1073031a',
  twitter: ''
}

console.log('Script loaded, data:', data);

function populateContent() {
  console.log('populateContent called');
  console.log('Data object:', data);
  try {
    document.getElementById('name').textContent = data.name
  document.getElementById('title').textContent = data.title
  document.getElementById('location').textContent = `${data.location} • ${data.email} ${data.phone? '• '+data.phone : ''}`
  const metaEl = document.getElementById('meta')
  metaEl.textContent = 'DOB: 20/5/2006 • University: Parul University'
  document.getElementById('aboutText').textContent = data.about

  // Group skills into categories
  const frontend = ['HTML5','CSS3','JavaScript (ES6+)','TypeScript','React.js','Next.js']
  const backend = ['Node.js','Express.js','Python (APIs - basics)']
  const infra = ['MongoDB','AWS (basic)']
  const langs = ['C++','Java','Data Structures & Algorithms (DSA)']

  // Combine backend, databases & cloud into one array for skillsInfra
  const combinedInfra = [...backend, ...infra]

  function renderList(id, arr){
    const el = document.getElementById(id)
    if(!el) return
    arr.forEach(s=>{
      const chip = document.createElement('div')
      chip.className = 'chip'
      chip.textContent = s
      el.appendChild(chip)
    })
  }

  renderList('skillsFrontend', frontend)
  renderList('skillsBackend', backend)
  renderList('skillsLang', langs)
  renderList('skillsInfra', infra)

  const experienceList = document.getElementById('experienceList')
  data.experiences.forEach(e=>{
    const card = document.createElement('article')
    card.className = 'card'
    card.innerHTML = `
      <h3>${e.title}</h3>
      <p class="meta">${e.period || ''}</p>
      <p>${e.desc}</p>
    `
    experienceList.appendChild(card)
  })

  // Social links
  const github = document.getElementById('githubLink')
  if(github) github.href = data.github || '#'
  const linkedin = document.getElementById('linkedinLink')
  if(linkedin) linkedin.href = data.linkedin || '#'
  const emailBtn = document.getElementById('emailBtn')
  if(emailBtn) emailBtn.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${data.email}`
  // Twitter link removed

  const resumeLink = document.getElementById('resumeLink')
  if(data.resume){
    resumeLink.href = data.resume
  } else {
    resumeLink.style.display = 'none'
  }

  // Remove any leftover default contact paragraph that says "If you'd like to reach me" or contains a placeholder email
  // This ensures old placeholder text like "you@example.com" is removed if it exists in the page.
  try{
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT)
    const toRemove = []
    while(walker.nextNode()){
      const el = walker.currentNode
      if(el.children.length === 0 && el.textContent){
        const txt = el.textContent.trim()
        if(/If you'?d like to reach me/i.test(txt) || /you@example\.com/i.test(txt)){
          toRemove.push(el)
        }
      }
    }
    toRemove.forEach(n=>n.remove())
  }catch(e){
    // non-fatal
    console.warn('cleanup:', e)
  }

  // Contact Button Functionality
  const btn = document.getElementById('contactBtn')
  btn.addEventListener('click', function() {
    const mailtoLink = 'mailto:shubhboda@gmail.com?subject=Hello%20from%20your%20site&body=Hi%20Shubh%2C%0D%0A%0D%0AI%20saw%20your%20CV%20and%20would%20like%20to%20connect.'
    window.location.href = mailtoLink
  })

  // Email link is now a direct mailto link in HTML
  } catch (error) {
    console.error('Error in DOM manipulation:', error);
  }
}

document.addEventListener('DOMContentLoaded', populateContent);

// Also try to run immediately in case DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', populateContent);
} else {
  populateContent();
}
