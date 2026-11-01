const $=id=>document.getElementById(id);
const qs=(s,r=document)=>r.querySelector(s), qa=(s,r=document)=>[...r.querySelectorAll(s)];
const safe={get:k=>{try{return localStorage.getItem(k)}catch(e){return null}},set:(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}}};

/* ---------- CONTENT ---------- */
const S=[
{t:'Introduction',s:'Introduction',n:'A computer is an electronic machine that accepts input, stores and processes data under stored instructions, and gives output. Five functional units: Input, Output, Memory, ALU, Control Unit.',h:`
<p><b>Computer:</b> an electronic device that takes <i>input</i>, processes it using a stored <i>program</i>, keeps data in <i>memory</i> and produces <i>output</i>. Example: your laptop reads keystrokes, processes them and shows letters on screen.</p>
<div class="grid"><div class="box"><b>Input unit</b><br>Brings data in (keyboard, mouse, touchscreen).</div><div class="box"><b>Output unit</b><br>Shows results (monitor, printer, speaker).</div><div class="box"><b>Memory unit</b><br>Stores programs and data (RAM, cache, SSD).</div><div class="box"><b>ALU</b><br>Does arithmetic (+ − × ÷) and logic (AND, OR, compare).</div><div class="box"><b>Control Unit</b><br>The "manager": fetches instructions and sends signals to all units.</div></div>
<h3>Block diagram (click any block)</h3>
<svg id="d1" viewBox="0 0 640 220"><g class="ln"><path d="M100 115H145V175H190M440 175H495V115H540M245 150V80M385 150V80M330 55H300"/></g>
<g><rect class="b" x="10" y="90" width="90" height="50" rx="8" data-i="Input unit: converts user data into binary and sends it to memory/ALU."/><text x="55" y="120" text-anchor="middle">Input</text>
<rect class="b" x="540" y="90" width="90" height="50" rx="8" data-i="Output unit: converts binary results into a form humans understand."/><text x="585" y="120" text-anchor="middle">Output</text>
<rect class="b" x="190" y="30" width="110" height="50" rx="8" data-i="ALU: performs arithmetic and logical operations on operands held in registers."/><text x="245" y="60" text-anchor="middle">ALU</text>
<rect class="b" x="330" y="30" width="110" height="50" rx="8" data-i="Control Unit: decodes instructions and generates timing/control signals for every unit."/><text x="385" y="60" text-anchor="middle">Control Unit</text>
<rect class="b" x="190" y="150" width="250" height="50" rx="8" data-i="Memory: holds the program and data. Primary memory is fast; secondary memory is large."/><text x="315" y="180" text-anchor="middle">Memory Unit</text></g></svg>
<div class="info" id="i1">Click a block to see what it does.</div>
<p><b>How they communicate:</b> Input → Memory (data stored) → Control Unit fetches an instruction → ALU executes it using data from memory → result goes back to memory → Output unit displays it. All units talk through buses, directed by control signals.</p>`},
{t:'History of Digital Computers',s:'History',n:'Gen1 vacuum tubes (1940-56), Gen2 transistors (1956-63), Gen3 ICs (1964-71), Gen4 microprocessors (1971-present), Gen5 AI (present and beyond).',h:`<p>Select a generation:</p><div class="tl" id="tlb"></div><div class="info" id="tli"></div>`},
{t:'Recent Trends in Computers',s:'Trends',n:'Trends: multi-core processors, parallel processing, cloud computing, AI/NPU processors, DDR5/LPDDR/NVMe memory, high-performance computing.',h:`<div class="grid">
<div class="box"><b>⚙️ Modern processors</b><br>3-5 nm chips with billions of transistors, e.g. Apple M-series, Intel Core, AMD Ryzen.</div>
<div class="box"><b>🧩 Multi-core</b><br>Several CPU cores on one chip. A smartphone has 8 cores: big ones for games, small ones to save battery.</div>
<div class="box"><b>🔀 Parallel processing</b><br>Many tasks done at the same time; a GPU runs thousands of threads to render video.</div>
<div class="box"><b>☁️ Cloud computing</b><br>Rent computing over the internet: Google Drive, Netflix servers, AWS.</div>
<div class="box"><b>🤖 AI processors</b><br>NPUs/TPUs speed up neural networks: face unlock, voice assistants, photo enhancement.</div>
<div class="box"><b>💾 Modern memory</b><br>DDR5 RAM, LPDDR in phones, NVMe SSDs, HBM in GPUs.</div>
<div class="box"><b>🚀 HPC</b><br>Supercomputers linking thousands of processors for weather and drug research.</div></div>`},
{t:'Von Neumann Architecture',s:'Von Neumann',n:'Von Neumann: one memory for instructions and data, one bus; stored-program concept. Fetch-decode-execute cycle. Pro: simple, flexible. Con: Von Neumann bottleneck.',h:`
<p><b>Definition:</b> A design where program instructions and data are stored in the <b>same memory</b> and travel over the <b>same bus</b> (the <i>stored-program concept</i>, proposed by John von Neumann, 1945).</p>
<svg viewBox="0 0 500 190"><g class="ln"><path d="M250 95H290M290 40V150M290 55H330M290 140H330"/></g><path class="ln act" d="M290 40V150"/>
<rect class="b" x="20" y="20" width="230" height="150" rx="10"/><text x="135" y="40" text-anchor="middle">CPU</text>
<rect class="b" x="35" y="55" width="95" height="40" rx="6"/><text x="82" y="80" text-anchor="middle">ALU</text><rect class="b" x="140" y="55" width="95" height="40" rx="6"/><text x="187" y="80" text-anchor="middle">Control Unit</text><rect class="b" x="35" y="110" width="200" height="40" rx="6"/><text x="135" y="135" text-anchor="middle">Registers (PC, IR, MAR, MDR)</text>
<rect class="b" x="330" y="20" width="150" height="70" rx="8"/><text x="405" y="50" text-anchor="middle">Memory</text><text x="405" y="70" text-anchor="middle">(instructions + data)</text><rect class="b" x="330" y="110" width="150" height="60" rx="8"/><text x="405" y="145" text-anchor="middle">Input / Output</text><text x="272" y="185" text-anchor="middle" style="font-size:11px">single shared bus</text></svg>
<h3>Fetch – Decode – Execute (animated)</h3><div id="st1"></div>
<div class="two"><div class="box"><b>✅ Advantages</b><ul><li>Simple, low-cost design</li><li>Flexible: program is just data</li><li>Efficient memory use</li></ul></div><div class="box"><b>❌ Disadvantages</b><ul><li>Von Neumann bottleneck: only one fetch at a time</li><li>A faulty program can overwrite instructions</li></ul></div></div>`},
{t:'Harvard Architecture',s:'Harvard',n:'Harvard: separate instruction and data memories with separate buses; parallel fetch; used in DSPs, microcontrollers (AVR, PIC). Faster but costlier.',h:`
<p><b>Definition:</b> A design with <b>separate memories and buses</b> for instructions and data, so the CPU can fetch an instruction and access data <i>at the same time</i>.</p>
<svg viewBox="0 0 500 190"><g class="ln"><path class="act" d="M220 60H330M220 130H330"/></g>
<rect class="b" x="20" y="30" width="200" height="130" rx="10"/><text x="120" y="60" text-anchor="middle">CPU</text><text x="120" y="95" text-anchor="middle">ALU + Control + Registers</text>
<rect class="b" x="330" y="30" width="150" height="55" rx="8"/><text x="405" y="62" text-anchor="middle">Instruction Memory</text><rect class="b" x="330" y="105" width="150" height="55" rx="8"/><text x="405" y="137" text-anchor="middle">Data Memory</text></svg>
<p><b>Applications:</b> microcontrollers (Arduino/AVR, PIC), digital signal processors, embedded systems; modern CPUs use it inside as split L1 instruction/data caches.</p>
<div class="two"><div class="box"><b>✅ Advantages</b><ul><li>Parallel instruction + data access</li><li>Higher speed</li><li>Instructions are protected</li></ul></div><div class="box"><b>❌ Disadvantages</b><ul><li>More complex, costly hardware</li><li>Unused memory in one part cannot be shared</li></ul></div></div>
<table><tr><th>Feature</th><th>Von Neumann</th><th>Harvard</th></tr><tr><td>Memory</td><td>Single, shared</td><td>Separate instruction &amp; data</td></tr><tr><td>Buses</td><td>One</td><td>Two (or more)</td></tr><tr><td>Speed</td><td>Slower (bottleneck)</td><td>Faster</td></tr><tr><td>Cost/complexity</td><td>Low</td><td>High</td></tr><tr><td>Used in</td><td>PCs, general computers</td><td>DSPs, microcontrollers</td></tr></table>`},
{t:'Basic Operational Concepts',s:'Operational Concepts',n:'Program execution: PC to MAR, memory read to MDR, IR load, decode, operand fetch, execute in ALU, store result. Registers: PC, IR, MAR, MDR, ACC, general registers.',h:`
<p>A program is a list of instructions in memory. The CPU repeats the <b>instruction cycle</b>: <b>Fetch → Decode → Execute</b> for each one.</p>
<table><tr><th>Register</th><th>Role</th></tr><tr><td>PC (Program Counter)</td><td>Address of next instruction</td></tr><tr><td>IR (Instruction Register)</td><td>Holds current instruction</td></tr><tr><td>MAR</td><td>Address to read/write in memory</td></tr><tr><td>MDR</td><td>Data going to/from memory</td></tr><tr><td>ACC / general</td><td>Hold operands and results</td></tr></table>
<p><b>Memory operations:</b> <i>Read (Load)</i> copies data from memory to the CPU; <i>Write (Store)</i> copies CPU data to memory.</p>
<h3>Run the program: LOAD A; ADD B (A=7, B=5)</h3><div id="st2"></div>`},
{t:'Bus Structures',s:'Bus',n:'Bus = shared communication path. Data bus (bidirectional, carries data), address bus (unidirectional from CPU, selects location, n bits = 2^n locations), control bus (read/write/clock signals). Wider and faster bus = more throughput.',h:`
<p>A <b>bus</b> is a group of wires shared by CPU, memory and I/O to send information.</p>
<div class="grid"><div class="box"><b>Data bus</b><br>Carries data; bidirectional. Width = word size (32/64 bits).</div><div class="box"><b>Address bus</b><br>Carries the location address, one-way from CPU. n bits → 2<sup>n</sup> locations.</div><div class="box"><b>Control bus</b><br>Carries signals like READ, WRITE, CLOCK, INTERRUPT.</div></div>
<div class="f">Bus bandwidth = bus width × clock rate. Example: 64-bit at 100 MHz = 8 B × 100M = 800 MB/s</div>
<h3>Interactive demo: choose an operation</h3>
<svg viewBox="0 0 560 230"><rect class="b" x="20" y="10" width="110" height="50" rx="8"/><text x="75" y="40" text-anchor="middle">CPU</text><rect class="b" x="225" y="10" width="110" height="50" rx="8"/><text x="280" y="40" text-anchor="middle">Memory</text><rect class="b" x="430" y="10" width="110" height="50" rx="8"/><text x="485" y="40" text-anchor="middle">I/O device</text>
<g class="ln"><path d="M50 60V150M75 60V170M100 60V190M255 60V150M280 60V170M305 60V190M455 60V150M485 60V170M515 60V190"/><path id="ba" d="M50 150H455"/><path id="bd" d="M50 170H485" /><path id="bc" d="M50 190H515"/></g>
<text x="20" y="147">Address</text><text x="20" y="167">Data</text><text x="20" y="187">Control</text></svg>
<div class="row"><button class="pri" data-op="0">Read from memory</button><button class="pri" data-op="1">Write to memory</button><button class="pri" data-op="2">Read from keyboard (I/O)</button></div>
<div class="info" id="bi">Press a button to see which bus is active.</div>
<p><b>System bus organization:</b> CPU, memory and I/O share address + data + control buses; only one device may drive the bus at a time (bus arbitration). Wider bus = more data per transfer; faster bus clock = more transfers per second.</p>`},
{t:'Computer Performance',s:'Performance',n:'CPU time = IC x CPI x cycle time = IC x CPI / clock rate. Performance = 1 / CPU time. Cycle time = 1 / clock rate. Speedup = TimeA/TimeB.',h:`
<p><b>Processor clock:</b> a steady pulse that times every operation. <b>Clock rate</b> = pulses per second (Hz); 3 GHz = 3×10⁹ cycles/s. <b>Clock cycle time</b> = 1 / clock rate (3 GHz → 0.33 ns).</p>
<div class="f">CPU Execution Time = Instruction Count × CPI × Clock Cycle Time</div>
<div class="f">CPU Execution Time = (Instruction Count × CPI) / Clock Rate</div>
<div class="f">CPU Performance = 1 / CPU Execution Time</div>
<ul><li><b>Instruction Count (IC):</b> instructions the program executes.</li><li><b>CPI:</b> average clock cycles per instruction.</li><li><b>Speedup</b> = Time(A) / Time(B).</li></ul>
<h3>Solved problems</h3>
<details open><summary>Problem 1: IC = 10⁹, CPI = 2, clock = 2 GHz. Find CPU time.</summary>Cycle time = 1/(2×10⁹) = 0.5 ns. Time = 10⁹ × 2 × 0.5×10⁻⁹ = <b>1 s</b>. Performance = 1/1 = 1 program/s.</details>
<details><summary>Problem 2: Same program on A (3 GHz, CPI 2) and B (2 GHz, CPI 1.2), IC = 6×10⁹. Which is faster?</summary>A = 6×10⁹×2 / 3×10⁹ = 4 s. B = 6×10⁹×1.2 / 2×10⁹ = 3.6 s. B is faster by 4/3.6 = <b>1.11×</b> despite the lower clock.</details>
<details><summary>Problem 3: A processor takes 8 s at 2 GHz. Target 5 s with the same IC; CPI rises 1.2×. New clock?</summary>Cycles now = 8×2×10⁹ = 16×10⁹. New cycles = 19.2×10⁹. Clock = 19.2×10⁹ / 5 = <b>3.84 GHz</b>.</details>
<h3>CPU performance calculator</h3>
<div class="two"><div><label>Instruction count</label><input type="number" id="c_ic" value="1000000000"><label>CPI</label><input type="number" id="c_cpi" value="2" step="0.1"><label>Clock rate (GHz)</label><input type="number" id="c_f" value="2" step="0.1"><br><button class="pri" id="c_go">Calculate</button></div><div class="out" id="c_out">Result appears here.</div></div>`},
{t:'Project: CPU Performance Comparison',s:'Project',n:'Compare two processors: time = IC x CPI / clock. Lower time = better. Higher clock does not guarantee faster performance; CPI and IC matter.',h:`
<p>Enter details of two processors and compare them on the same program.</p>
<div class="two" id="pj"></div><div class="row"><button class="pri" id="p_go">Compare</button></div>
<canvas id="pc" width="500" height="220"></canvas><div class="out" id="p_out">Press Compare.</div>`},
{t:'Self-Learning Topics',s:'Self-Learning',n:'Metrics: execution time, throughput, MIPS, FLOPS, CPI. 2-mark: define bus, CPI. 4-mark: Von Neumann vs Harvard. 6-mark: fetch-decode-execute. 8-mark: performance equation with numericals.',h:`
<h3>Performance metrics</h3>
<table><tr><th>Metric</th><th>Meaning</th></tr><tr><td>Execution time</td><td>Time to finish one program</td></tr><tr><td>Throughput</td><td>Programs/tasks finished per second</td></tr><tr><td>MIPS</td><td>Millions of instructions per second = Clock rate / (CPI × 10⁶)</td></tr><tr><td>FLOPS</td><td>Floating-point operations per second (GPUs, supercomputers)</td></tr></table>
<p><b>Real-world examples:</b> a phone SoC (8 cores, NPU) saves battery with small cores; a gaming laptop pairs a multi-core CPU with a GPU; a data centre runs thousands of servers in parallel.</p>
<h3>Important questions</h3>
<details><summary>2 marks</summary><ol><li>Define computer bus.</li><li>What is CPI?</li><li>Write the basic performance equation.</li><li>What is the stored-program concept?</li></ol></details>
<details><summary>4 marks</summary><ol><li>List the functional units of a computer.</li><li>Differentiate Von Neumann and Harvard architecture.</li><li>Explain the roles of PC, IR, MAR and MDR.</li></ol></details>
<details><summary>6 marks</summary><ol><li>Explain fetch–decode–execute with a diagram.</li><li>Explain data, address and control buses.</li><li>Describe the five generations of computers.</li></ol></details>
<details><summary>8 marks</summary><ol><li>Explain the basic performance equation; solve a numerical comparing two processors.</li><li>Draw and explain the Von Neumann architecture with advantages and disadvantages.</li></ol></details>
<h3>Practice quiz</h3><p>Answer all 15 questions. <b id="qs">Score: 0/15</b> <button id="qr">Restart</button></p><div id="quiz"></div>`}
];
const GENS=[['1st','1940–1956','Vacuum tubes','💡','Huge, hot, unreliable, machine language. Example: ENIAC, UNIVAC.'],['2nd','1956–1963','Transistors','🔌','Smaller, faster, cheaper; assembly and early high-level languages (FORTRAN, COBOL). Example: IBM 1401.'],['3rd','1964–1971','Integrated circuits','🧠','Many transistors on one chip, operating systems, keyboards and monitors. Example: IBM 360.'],['4th','1971–present','Microprocessors','💻','Whole CPU on one chip (Intel 4004), PCs, laptops, GUIs, networks.'],['5th','Present and beyond','Artificial intelligence','🤖','AI, machine learning, NPUs/GPUs, cloud, quantum research. Example: voice assistants, ChatGPT-class systems.']];
const QZ=[
['Which unit performs arithmetic and logic operations?',['Control Unit','ALU','Memory','Bus'],1,'The ALU does arithmetic and logic.'],
['Which register holds the address of the next instruction?',['IR','MAR','PC','MDR'],2,'The Program Counter points to the next instruction.'],
['Von Neumann architecture stores instructions and data in…',['Separate memories','The same memory','Only registers','Only cache'],1,'Stored-program concept: one shared memory.'],
['A key advantage of Harvard architecture is…',['Simplicity','Parallel instruction and data access','Single bus','Lower cost'],1,'Separate buses allow simultaneous access.'],
['Which bus carries the memory location to be accessed?',['Data bus','Control bus','Address bus','Power bus'],2,'The address bus selects the location.'],
['Which bus is bidirectional?',['Address bus','Data bus','Both address and control','None'],1,'Data moves both to and from the CPU.'],
['A 16-bit address bus can address how many locations?',['16','1024','65,536','1,048,576'],2,'2^16 = 65,536.'],
['CPU execution time equals…',['IC + CPI + cycle time','IC × CPI × cycle time','IC / CPI','CPI / clock rate'],1,'Time = IC × CPI × clock cycle time.'],
['Cycle time of a 2 GHz clock is…',['2 ns','0.5 ns','5 ns','0.2 ns'],1,'1 / (2×10⁹) = 0.5 ns.'],
['First-generation computers used…',['Transistors','ICs','Vacuum tubes','Microprocessors'],2,'ENIAC used vacuum tubes.'],
['Third-generation computers were based on…',['Integrated circuits','Vacuum tubes','Relays','Quantum chips'],0,'ICs put many transistors on one chip.'],
['IC = 10⁶, CPI = 2, clock = 1 GHz. CPU time?',['2 µs','2 ms','0.2 ms','20 ms'],1,'10⁶×2 / 10⁹ = 2×10⁻³ s = 2 ms.'],
['Which register holds the instruction being executed?',['PC','IR','MAR','ACC'],1,'The Instruction Register holds the current instruction.'],
['The control bus carries…',['Only data','Only addresses','Read/write and timing signals','Power'],2,'Control signals like READ, WRITE and CLOCK.'],
['A multi-core processor has…',['Many memory chips','Multiple CPU cores on one chip','Many buses','Many monitors'],1,'Each core can run its own instruction stream.']];
const BUS=[['Read from memory',['addr','① CPU places the memory address on the <b>address bus</b>.'],['ctl','② CPU sends READ on the <b>control bus</b>.'],['dat','③ Memory puts data on the <b>data bus</b> → CPU.']],
['Write to memory',['addr','① CPU places the address on the <b>address bus</b>.'],['dat','② CPU puts data on the <b>data bus</b>.'],['ctl','③ CPU sends WRITE on the <b>control bus</b>; memory stores it.']],
['Keyboard input',['addr','① CPU puts the I/O port address on the <b>address bus</b>.'],['ctl','② CPU sends I/O READ on the <b>control bus</b>.'],['dat','③ Keyboard sends the key code on the <b>data bus</b>.']]];

/* ---------- RENDER ---------- */
const done=new Set(JSON.parse(safe.get('done')||'[]'));
$('main').innerHTML=S.map((s,i)=>`<section id="s${i+1}"><h2>${i+1}. ${s.t}</h2>${s.h}<p><label><input type="checkbox" data-i="${i}" ${done.has(i)?'checked':''}> Mark this topic as completed</label></p><div class="pn">${i?`<button onclick="go(${i})">◀ ${S[i-1].s}</button>`:'<span></span>'}${i<S.length-1?`<button class="pri" onclick="go(${i+2})">${S[i+1].s} ▶</button>`:'<span></span>'}</div></section>`).join('');
$('links').innerHTML=S.map((s,i)=>`<a href="#s${i+1}">${s.s}</a>`).join('');
function go(n){$('s'+n).scrollIntoView()}
function prog(){$('bar').style.width=done.size*10+'%';$('ptxt').textContent=done.size+' of '+S.length+' topics completed';safe.set('done',JSON.stringify([...done]))}
qa('input[data-i]').forEach(c=>c.onchange=()=>{c.checked?done.add(+c.dataset.i):done.delete(+c.dataset.i);prog()});prog();

/* nav, theme, search, notes */
$('menu').onclick=()=>$('links').classList.toggle('open');
$('links').onclick=()=>$('links').classList.remove('open');
$('theme').onclick=()=>{const d=document.documentElement,l=d.dataset.theme=='dark'?'light':'dark';d.dataset.theme=l;safe.set('theme',l)};
if(safe.get('theme'))document.documentElement.dataset.theme=safe.get('theme');
const secs=qa('section'),lk=qa('#links a');
addEventListener('scroll',()=>{let c=0;secs.forEach((s,i)=>{if(s.getBoundingClientRect().top<120)c=i});lk.forEach((a,i)=>a.classList.toggle('on',i==c))});
$('q').oninput=e=>{const v=e.target.value.toLowerCase().trim(),r=$('res');if(!v){r.style.display='none';return}
 const m=secs.map((s,i)=>[i,s.textContent.toLowerCase().includes(v)]).filter(x=>x[1]);
 r.innerHTML=m.length?m.map(x=>`<a href="#s${x[0]+1}" onclick="$('res').style.display='none'">${x[0]+1}. ${S[x[0]].t}</a>`).join(''):'<a>No topic found</a>';r.style.display='block'};
$('dl').onclick=()=>{const t='BASIC STRUCTURE OF COMPUTERS - STUDY NOTES\n\n'+S.map((s,i)=>(i+1)+'. '+s.t+'\n'+s.n).join('\n\n')+'\n\nKey formulas:\nCPU time = IC x CPI x Cycle time\nCPU time = IC x CPI / Clock rate\nPerformance = 1 / CPU time\n';
 const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:'text/plain'}));a.download='computer-structure-notes.txt';a.click()};

/* S1 diagram */
qa('#d1 .b').forEach(b=>b.onclick=()=>{qa('#d1 .b').forEach(x=>x.classList.remove('hot'));b.classList.add('hot');$('i1').textContent=b.dataset.i});
/* S2 timeline */
$('tlb').innerHTML=GENS.map((g,i)=>`<button data-g="${i}">${g[3]} ${g[0]} gen</button>`).join('');
function gen(i){qa('#tlb button').forEach((b,k)=>b.classList.toggle('on',k==i));const g=GENS[i];$('tli').innerHTML=`<h3>${g[3]} ${g[0]} Generation (${g[1]}) – ${g[2]}</h3><p>${g[4]}</p>`}
qa('#tlb button').forEach(b=>b.onclick=()=>gen(+b.dataset.g));gen(0);

/* steppers */
function stepper(id,init,steps){const c=$(id);c.innerHTML='<div class="regs"></div><ul class="steps">'+steps.map(s=>'<li>'+s[0]+'</li>').join('')+'</ul><div class="row"><button class="pri">Next step ▶</button><button>Auto play</button><button>Reset</button></div>';
 let i=-1,tm;const li=qa('li',c),rg=qs('.regs',c),bt=qa('button',c);
 const show=()=>{li.forEach((l,k)=>l.classList.toggle('on',k==i));rg.innerHTML=Object.entries(i<0?init:steps[i][1]).map(([k,v])=>`<span>${k} = ${v}</span>`).join('')};
 const next=()=>{i=(i+1)%steps.length;show()};
 bt[0].onclick=()=>{clearInterval(tm);next()};
 bt[1].onclick=()=>{clearInterval(tm);i=-1;tm=setInterval(()=>{next();if(i==steps.length-1)clearInterval(tm)},1200)};
 bt[2].onclick=()=>{clearInterval(tm);i=-1;show()};show()}
const d='ADD R1,R2';
stepper('st1',{PC:100,MAR:'–',MDR:'–',IR:'–'},[
['FETCH 1: MAR ← PC (address 100 goes to memory)',{PC:100,MAR:100,MDR:'–',IR:'–'}],
['FETCH 2: Memory read, MDR ← M[MAR] (via data bus)',{PC:100,MAR:100,MDR:d,IR:'–'}],
['FETCH 3: IR ← MDR and PC ← PC + 1',{PC:101,MAR:100,MDR:d,IR:d}],
['DECODE: control unit decodes the opcode ADD',{PC:101,MAR:100,MDR:d,IR:d+' (decoded)'}],
['EXECUTE: ALU does R1 ← R1 + R2; the cycle restarts at PC = 101',{PC:101,MAR:100,MDR:d,IR:d+' (done)'}]]);
stepper('st2',{PC:200,MAR:'–',IR:'–',ACC:'–'},[
['1. MAR ← PC (200)',{PC:200,MAR:200,IR:'–',ACC:'–'}],
['2. Read memory; IR ← LOAD A; PC ← 201',{PC:201,MAR:200,IR:'LOAD A',ACC:'–'}],
['3. Decode LOAD; operand address A = 500',{PC:201,MAR:200,IR:'LOAD A',ACC:'–'}],
['4. MAR ← 500; memory read gives MDR = 7',{PC:201,MAR:500,IR:'LOAD A',ACC:'–'}],
['5. Execute: ACC ← MDR (ACC = 7)',{PC:201,MAR:500,IR:'LOAD A',ACC:7}],
['6. Fetch next instruction ADD B (PC = 201); PC ← 202',{PC:202,MAR:201,IR:'ADD B',ACC:7}],
['7. Operand B = 5 fetched; ALU adds: ACC = 7 + 5 = 12',{PC:202,MAR:501,IR:'ADD B',ACC:12}]]);

/* bus demo */
qa('[data-op]').forEach(b=>b.onclick=()=>{const o=BUS[+b.dataset.op];const m={addr:'ba',dat:'bd',ctl:'bc'};['ba','bd','bc'].forEach(x=>$(x).classList.remove('act'));$('bi').innerHTML='<b>'+o[0]+'</b>';
 o.slice(1).forEach((s,k)=>setTimeout(()=>{$(m[s[0]]).classList.add('act');$('bi').innerHTML+='<br>'+s[1]},k*1100))});

/* calculator */
const fmt=x=>x>=1?x.toFixed(3)+' s':x>=1e-3?(x*1e3).toFixed(3)+' ms':(x*1e6).toFixed(3)+' µs';
$('c_go').onclick=()=>{const ic=+$('c_ic').value,cpi=+$('c_cpi').value,f=+$('c_f').value*1e9;
 if(!(ic>0&&cpi>0&&f>0)){$('c_out').textContent='Enter positive numbers in every field.';return}
 const ct=1/f,t=ic*cpi*ct;$('c_out').innerHTML=`Clock cycle time = 1/f = <b>${(ct*1e9).toFixed(3)} ns</b><br>CPU time = IC × CPI × cycle time = <b>${fmt(t)}</b><br>Check: IC × CPI / f = ${fmt(ic*cpi/f)}<br>Performance = 1/time = <b>${(1/t).toExponential(3)}</b> programs/s<br>MIPS = ${(f/(cpi*1e6)).toFixed(1)}`};
$('c_go').click();

/* project */
const P=[['Processor A',3,5e9,1.5],['Processor B',2.5,5e9,1]];
$('pj').innerHTML=P.map((p,i)=>`<div class="box"><b>Processor ${'AB'[i]}</b><label>Name</label><input type="text" id="n${i}" value="${p[0]}"><label>Clock speed (GHz)</label><input type="number" id="f${i}" value="${p[1]}" step="0.1"><label>Number of instructions</label><input type="number" id="i${i}" value="${p[2]}"><label>CPI</label><input type="number" id="c${i}" value="${p[3]}" step="0.1"></div>`).join('');
$('p_go').onclick=()=>{const r=[0,1].map(i=>({n:$('n'+i).value||'CPU '+i,f:+$('f'+i).value,i:+$('i'+i).value,c:+$('c'+i).value}));
 if(r.some(x=>!(x.f>0&&x.i>0&&x.c>0))){$('p_out').textContent='Enter positive numbers in every field.';return}
 r.forEach(x=>x.t=x.i*x.c/(x.f*1e9));
 const cv=$('pc'),g=cv.getContext('2d'),st=getComputedStyle(document.body);g.clearRect(0,0,500,220);const mx=Math.max(r[0].t,r[1].t),best=r[0].t<=r[1].t?0:1;
 r.forEach((x,k)=>{const h=x.t/mx*150,xx=80+k*220;g.fillStyle=k==best?'#34d399':'#8b5cf6';g.fillRect(xx,180-h,110,h);g.fillStyle=st.color;g.font='14px sans-serif';g.textAlign='center';g.fillText(x.n,xx+55,200);g.fillText(x.t.toFixed(3)+' s',xx+55,172-h)});
 const w=r[best],l=r[1-best],sp=l.t/w.t;
 $('p_out').innerHTML=r.map(x=>`${x.n}: ${x.i.toExponential(2)} × ${x.c} / ${x.f}×10⁹ = <b>${x.t.toFixed(3)} s</b>`).join('<br>')+(sp-1<1e-9?'<br><b>Both take the same time.</b>':`<br><b>${w.n} is faster by ${sp.toFixed(2)}×.</b> `+(w.f<l.f?'It wins even with a lower clock because its CPI is lower: clock speed alone does not decide performance.':w.c>l.c?'Its higher clock outweighs its higher CPI.':'It has the higher clock and the lower or equal CPI, so it finishes the same instructions sooner.'))};
$('p_go').click();

/* quiz */
let sc=0,ans=0;
function quiz(){sc=ans=0;$('qs').textContent='Score: 0/15';$('quiz').innerHTML=QZ.map((q,i)=>`<div class="box" style="margin:8px 0"><b>Q${i+1}. ${q[0]}</b>${q[1].map((o,k)=>`<button class="opt" data-q="${i}" data-k="${k}">${o}</button>`).join('')}<div class="info" hidden></div></div>`).join('');
 qa('.opt').forEach(b=>b.onclick=()=>{const bx=b.parentNode;if(bx.dataset.d)return;bx.dataset.d=1;const i=+b.dataset.q,k=+b.dataset.k,ok=k==QZ[i][2];ans++;if(ok)sc++;
  qa('.opt',bx).forEach((o,j)=>{if(j==QZ[i][2])o.classList.add('ok')});if(!ok)b.classList.add('bad');
  const inf=qs('.info',bx);inf.hidden=false;inf.textContent=(ok?'Correct! ':'Not quite. ')+QZ[i][3];
  $('qs').textContent='Score: '+sc+'/15'+(ans==15?' – finished!':'')})}
$('qr').onclick=quiz;quiz();
