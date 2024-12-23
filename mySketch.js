// A tragic dataset with lots of humanity behind it. Honored to have worked on this for my final project!
// Used ChatGPT for help with development and debugging.

let table2;
let deaths = [];
let state = "intro"; // Current state
let monthsGrid = []; // Store grid for months
let currentDay = "";
let dots = []; // Dots for the animation
let cellWidth, cellHeight;
let clickState = 0;
let animationPaused = false;
let kerisDot = null;
let timer3 = 0;
let timer5 = 0;
let timer6 = 0;
let timer7 = 0;
let allowInput = true;
let introOpacity = 0; // Opacity for fade-in
let introOpacity2 = 0;
let newOpacity1 = 0;
let introOpacity3 = 0;
let introOpacity4 = 0;
let introOpacity5 = 0;
let introOpacity6 = 0;
let deathCounterOpacity = 255;
let introDuration = 120;
let introDuration2 = 300;
let newDuration1 = 500;
let introDuration3 = 150;
let introDuration4 = 400;
let introDuration5 = 300;
let introDuration6 = 450;
let introCounter = 0;
let genderCounter = 0;
let deathCounter = 0;
let globalOpacity = 255;
let fadeOutTimer = 0;

let fallClusterX, bluntForceClusterX, medicalEventsClusterX, crushingClusterX, vehicleClusterX, otherClusterX;
let maleClusterX, femaleClusterX, unknownClusterX, clusterY;
let age1ClusterX, age2ClusterX, age3ClusterX, age4ClusterX, unknownAgeClusterX, categoryClusterWidth, categoryClusterY;

function preload() {
  table2 = loadTable('osha_incident_categories.csv', 'csv', 'header');
	regularFont = loadFont('Eina01-Regular.ttf');
	semiBoldFont = loadFont('Eina02-SemiBold.ttf');
	semiBoldItalicFont = loadFont('Eina02-SemiboldItalic.ttf');
	boldFont = loadFont('Eina02-Bold.ttf');
	kerisImg = loadImage('kerisriebel.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  frameRate(60);
  setupGrid();
  loadDeaths();

  // Define cluster positions
  maleClusterX = width / 4;
  femaleClusterX = width*0.53;
  unknownClusterX = width*3 / 4;
	maleClusterY = height *0.53;
	femaleClusterY = height*0.7;
	unknownClusterY = height*0.7;
  age1ClusterX = width / 6
  age2ClusterX = (2 * width) / 6;
  age3ClusterX = (3 * width) / 6;
	age4ClusterX = (4 * width) / 6;
  unknownAgeClusterX = (5 * width) / 6;
  clusterY = height * 3/5;
	
	categoryClusterWidth = width / 6;
  categoryClusterY = height * 0.6;

  fallClusterX = categoryClusterWidth * 0.5;
  bluntForceClusterX = categoryClusterWidth * 1.5;
  medicalEventsClusterX = categoryClusterWidth * 2.5;
  crushingClusterX = categoryClusterWidth * 3.5;
  vehicleClusterX = categoryClusterWidth * 4.5;
  otherClusterX = categoryClusterWidth * 5.5;
	
  fallClusterY = height * 0.65;
  bluntForceClusterY = fallClusterY*0.54;
  medicalEventsClusterY = fallClusterY*0.3;
  crushingClusterY = fallClusterY*0.25;
  vehicleClusterY = fallClusterY*0.15;
  otherClusterY = fallClusterY*0.54;
}

function draw() {
  background(30);

if (state === "intro") {
    drawIntro();
  } else if (state === "animation") {
    drawAnimation();
  }
}

function loadDeaths() {
  const rows = table2.getRows();
  rows.forEach(row => {
    const date = new Date(row.getString("event_date"));
    const age = parseInt(row.getString("age")); // Parse age as an integer
    deaths.push({
      date,
      month: date.getMonth(), // Get month (0 = January, 11 = December)
      description: row.getString("event_desc"),
      keywords: row.getString("event_keyword"),
      sex: row.getString("sex"),
			category: row.getString("Category"),
      age: isNaN(age) ? null : age,
      added: false,
    });
  });
}



// Intro screen with fading text

function drawIntro() {
  background(30);

  push();
  textSize(30);
  textAlign(LEFT);
  fill(255);

  if (clickState === 0) {
    // First slide
		textFont(regularFont);
    fill(255, introOpacity);
    text(
      "This is Keris Riebel.",
      50,
      60
    );
		
		tint(255, introOpacity);
		image(kerisImg, 50, 90, windowHeight/3, windowHeight/3*1.32);

    fill(255, introOpacity2);
    text(
      '2022 was a big year for her: she turned 22, graduated college, and got married!',
      50,
      windowHeight/3*1.32+135
    );
		
		textFont(semiBoldItalicFont);
		fill(255, newOpacity1);
		textWrap(WORD);
    text(
      'On the first day of 2023, while millions of Americans celebrated the new year, she was murdered by a man with a machete while she checked out customers at Dollar Tree.',
      50,
      windowHeight/3*1.32+135+50,
			windowWidth - 100
    );
		textFont(regularFont);
		textSize(15);
		fill(200, newOpacity1);
		text(
      'Use arrows to navigate the story.',
      50,
      windowHeight/3*1.32+135+50+80,
			windowWidth - 100
    );
  } else if (clickState === 1) {
		textFont(regularFont);
    // Second slide
    fill(255, introOpacity3);
    text(
      'In the wake of this senseless tragedy, her name and life was known. “Everyone looked up to her,” said her aunt. Community members poured in money and love to support her loved ones, suffering with the weight of this tragedy: a GoFundMe created in her name raised over $80,000.',
      50,
      60,
			windowWidth-100
    );
		
		  const maxWidth = windowWidth - 100;
  const firstTextHeight = getTextHeight("In the wake of this senseless tragedy, her name and life was known. “Everyone looked up to her,” said her aunt. Community members poured in money and love to support her loved ones, suffering with the weight of this tragedy: a GoFundMe created in her name raised over $80,000.", regularFont, 30, maxWidth);

    fill(255, introOpacity4);
    text(
      'Still, her life’s end was summarized by just 4 key terms documented by OSHA:',
      50,
      60 + firstTextHeight + 20
    );
		
		fill(191, 5, 0, introOpacity4);
  rect(50, 60 + firstTextHeight + 37, 125, 50, 15);
  rect(193, 60 + firstTextHeight + 37, 127, 50, 15);
  rect(340, 60 + firstTextHeight + 37, 183, 50, 15);
  rect(545, 60 + firstTextHeight + 37, 300, 50, 15);
		
		fill(255, introOpacity4)
		textFont()
		text("Assault     Cashier     Retail Store     Workplace Violence",
				60,
				60 + firstTextHeight + 70)
		
  } else if (clickState === 2) {
    // Third slide
		textFont(regularFont);
    fill(255, introOpacity5);
		textWrap(WORD);
		const secondTextHeight = getTextHeight('Luckily, her life will be remembered. But Keris’s story is not an isolated one: each year, thousands of workers die on the job in America. Their deaths are logged by OSHA in a database, stripped of personal details and reduced to sterile keywords that could never capture the weight of their lives. Very few will gain media attention like Keris did, and the loved ones of even fewer will receive any sort of compensation for the loss they experience.', regularFont, 30, windowWidth-100);
    text(
      'Luckily, her life will be remembered. But Keris’s story is not an isolated one: each year, thousands of workers die on the job in America. Their deaths are logged by OSHA in a database, stripped of personal details and reduced to sterile keywords that could never capture the weight of their lives. Very few will gain media attention like Keris did, and the loved ones of even fewer will receive any sort of compensation for the loss they experience.',
      50,
      60,
			windowWidth-100
    );
		
		textFont(semiBoldItalicFont);
    fill(255, introOpacity6);
		textWrap(WORD);
    text("It’s time to move beyond the keywords: behind each dot in this graphic is a life cut short. Here are their stories.", 50, 60 + secondTextHeight + 20, windowWidth-100);
  }

  pop();

  introCounter++;
  updateIntroOpacity();
}

function updateIntroOpacity() {
  introOpacity = introOpacity2 = newOpacity1 = introOpacity3 = introOpacity4 = introOpacity5 = introOpacity6 = 0;

  if (clickState === 0) {
    introOpacity = map(introCounter, 0, introDuration, 0, 255);
    introOpacity2 = map(introCounter, introDuration, introDuration2, 0, 255);
		newOpacity1 = map(introCounter, introDuration2, newDuration1, 0, 255);
  } else if (clickState === 1) {
    introOpacity3 = map(introCounter, 0, introDuration3, 0, 255);
    introOpacity4 = map(introCounter, introDuration3, introDuration4, 0, 255);
  } else if (clickState === 2) {
    introOpacity5 = map(introCounter, 0, introDuration5, 0, 255);
    introOpacity6 = map(introCounter, introDuration5, introDuration6, 0, 255);
  }
}

// Animation showing dots populating in the grid by month
let currentDayIndex = 0; // Start at the first day of the year
let startDate = new Date(2023, 0, 1); // January 1, 2023
let endDate = new Date(2023, 11, 31); // December 31, 2023

let dotsToAddPerFrame;

function drawAnimation() {
  drawDeathCounter(); // Display the death counter
	let hoveredDot = null;

  if (clickState === 3) {
    drawCurrentDay(); // Display the current day
    let dotsAdded = 0;

    // Dynamically update dotsToAddPerFrame based on currentDayIndex
    dotsToAddPerFrame = map(currentDayIndex, 0, 100, 1, 12);

    if (!animationPaused && currentDayIndex <= 364) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + currentDayIndex);

      // Update the current day for display
      currentDay = currentDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      });

      // Add dots for deaths matching the current day
      deaths.forEach((death) => {
        if (!death.added && death.date.toDateString() === currentDate.toDateString() && dotsAdded < dotsToAddPerFrame) {
          const cell = monthsGrid[death.month];
          const randomX = random(cell.x - cellWidth / 2, cell.x + cellWidth / 2);
          const randomY = random(cell.y - cellHeight / 2, cell.y + cellHeight / 2);
          const dot = new Dot(random(width), random(height), randomX, randomY, death);

          dots.push(dot);

          if (death.keywords.includes("Cashier") && death.keywords.includes("Retail Store")) {
            kerisDot = dot; // Identify Keris's dot
          }

          death.added = true;
          dotsAdded++;
          deathCounter++;

          // Pause the animation after the first two dots
          if (dots.length === 2) {
            animationPaused = true;
          }
        }
      });

      if (dotsAdded < dotsToAddPerFrame) {
        currentDayIndex++;
      }
    }
  }

  if (animationPaused && kerisDot) {
    drawKerisGlow();
    push();
    textFont(semiBoldFont);
    textSize(18);
    fill(255);
    textAlign(LEFT);
    text("This dot represents Keris's life.", kerisDot.x + 30, kerisDot.y);
    pop();
  }

  drawKerisGlow();

  dots.forEach((dot) => {
    dot.update();
    dot.display();
		dot.drawGlow();
    if (dot.hovered()) {
      hoveredDot = dot;
    }
  });

  if (hoveredDot) {
    hoveredDot.showPopup();
  }

  if (currentDayIndex > 364 && deaths.every((death) => death.added) && clickState === 3) {
		timer3++;
    push();
		let rectFill = map(timer3, 0, 90, 0, 100);
		if(rectFill > 100) {
			rectFill = 100;
		}
    fill(0, 0, 0, rectFill);
    rectMode(CENTER);
    rect(windowWidth / 2, windowHeight / 2, 1050, 150);
    fill(255, 255, 255, map(timer3, 0, 90, 0, 255));
    textFont(semiBoldFont);
    textSize(25);
    textAlign(CENTER, CENTER);
    text(
      "In total, 1,849 workers were killed in accidents that OSHA investigated.\nThough few of their names are publicly known, each of them\nleaves behind a mourning family, loved ones, and an irreplacable void in this world.",
      windowWidth / 2,
      windowHeight / 2
    );
    pop();
  }
	
 else if (clickState === 4) {
    // Gender clustering
    const maleCount = dots.filter(dot => dot.death.sex === "M").length;
    const femaleCount = dots.filter(dot => dot.death.sex === "F").length;
    const unknownCount = dots.filter(dot => dot.death.sex === "").length;
    const total = maleCount + femaleCount + unknownCount;

    // Draw cluster labels
    fill(255);
    textSize(28);
    textAlign(CENTER);
	 	textFont(boldFont);
    text("Men", maleClusterX, windowHeight*0.915);
    text("Women", femaleClusterX, windowHeight*0.915);
	 	text("Unknown", unknownClusterX, windowHeight*0.915);
	 
	 	textFont(regularFont);
	 	textSize(24);
    text(`${maleCount} Lives Lost: ${((maleCount / total) * 100).toFixed(1)}%`, maleClusterX, windowHeight*0.915+25);
    text(`${femaleCount} Lives Lost: ${((femaleCount / total) * 100).toFixed(1)}%`, femaleClusterX, windowHeight*0.915+25);
    text(`${unknownCount} Lives Lost: ${((unknownCount / total) * 100).toFixed(1)}%`, unknownClusterX, windowHeight*0.915+25);
		
	 drawKerisGlow();
	 
		let hoveredDot = null;

		dots.forEach(dot => {
			dot.update();
			dot.display();
			dot.drawGlow();
			if (dot.hovered()) {
				hoveredDot = dot; // Track the hovered dot
			}
		});
	 
		if (hoveredDot) {
			hoveredDot.showPopup();
		}

	 
	 if (dots.every(dot => dot.settled)) {
	 genderCounter++;
	 push();
	 fill(255, 255, 255, map(genderCounter, 0, 90, 0, 255));
	 textSize(24);
	 textAlign(RIGHT);
	 textWrap(WORD);
	 text("Keris was one of the 135 women killed in OSHA-reported workplace incidents this year. Still, these women make up only 7.3% of the total fatality count: the vast majority of people killed were men, who make up a disproportionate amount of the workforce in the most anonymous and hazardous industries, including construction, warehousing, and agriculture.", windowWidth* 2/5, 150, windowWidth* 0.5);
	 pop();
	 }
  }
	
else if (clickState === 5) {
  timer5++;

  const maleCount = dots.filter(dot => dot.death.sex === "M").length;
  const femaleCount = dots.filter(dot => dot.death.sex === "F").length;
  const unknownCount = dots.filter(dot => dot.death.sex === "").length;
  const total = maleCount + femaleCount + unknownCount;

  fill(255);
  textSize(28);
  textAlign(CENTER);
  textFont(boldFont);
  text("Men", maleClusterX, windowHeight * 0.915);
  text("Women", femaleClusterX, windowHeight * 0.915);
  text("Unknown", unknownClusterX, windowHeight * 0.915);

  textFont(regularFont);
  textSize(24);
  text(`${maleCount} Lives Lost: ${((maleCount / total) * 100).toFixed(1)}%`, maleClusterX, windowHeight * 0.915 + 25);
  text(`${femaleCount} Lives Lost: ${((femaleCount / total) * 100).toFixed(1)}%`, femaleClusterX, windowHeight * 0.915 + 25);
  text(`${unknownCount} Lives Lost: ${((unknownCount / total) * 100).toFixed(1)}%`, unknownClusterX, windowHeight * 0.915 + 25);

  drawKerisGlow();

let hoveredDot = null;

dots.forEach(dot => {
  let currentAlpha;
  currentAlpha = map(timer5, 0, 40, 150, 30);
  if (currentAlpha < 30) {
    currentAlpha = 30;
  }

  if (dot.death.sex === "M") {
    dot.color = color(100, 150, 255, currentAlpha);
  } else if (dot.death.sex === "F") {
    dot.color = color(240, 98, 158, currentAlpha);
  } else {
    dot.color = color(255, 255, 255, map(timer5, 0, 40, 0, 255));
  }

  dot.update();
  dot.display();
	dot.drawGlow();
  if (dot.hovered()) {
    hoveredDot = dot;
  }
});

if (hoveredDot) {
  hoveredDot.showPopup();
}

  if (dots.every(dot => dot.settled)) {
    push();
    fill(255);
    textFont(semiBoldFont);
    textSize(24);
    textAlign(RIGHT);
    textWrap(WORD);
    text(
      "OSHA did not document any identifying information at all about 16 victims: their stories are lost.",
      windowWidth * 2 / 5,
      150,
      windowWidth * 0.5
    );
    pop();
  }
}

	
	else if (clickState === 6) {
	if (deathCounterOpacity > 0) {
    deathCounterOpacity -= 5;
  }
		
		const age1Count = dots.filter(dot => dot.death.age !== null && dot.death.age != 0 && dot.death.age < 30).length;
    const age2Count = dots.filter(dot => dot.death.age >= 30 && dot.death.age <= 49).length;
		const age3Count = dots.filter(dot => dot.death.age >= 50 && dot.death.age <= 69).length;
    const age4Count = dots.filter(dot => dot.death.age >= 70).length;
    const unknownAgeCount = dots.filter(dot => dot.death.age === 0).length;
    const total = age1Count + age2Count + age3Count + age4Count + unknownAgeCount;

		push();
    fill(255);
    textAlign(CENTER);
		textFont(boldFont);
		textSize(28);
		
    text("Under 30", age1ClusterX, windowHeight*8.7/10);
    text("30-49", age2ClusterX, windowHeight*8.7/10);
    text("50-69", age3ClusterX, windowHeight*8.7/10);
		text("70+", age4ClusterX, windowHeight*8.7/10);
    text("Unknown", unknownAgeClusterX, windowHeight*8.7/10);

		textFont(regularFont);
    textSize(24);
		text(`${age1Count} Deaths: ${((age1Count / total) * 100).toFixed(1)}%`, age1ClusterX, windowHeight*8.7/10 + 30);
		text(`${age2Count} Deaths: ${((age2Count / total) * 100).toFixed(1)}%`, age2ClusterX, windowHeight*8.7/10 + 30);
		text(`${age3Count} Deaths: ${((age3Count / total) * 100).toFixed(1)}%`, age3ClusterX, windowHeight*8.7/10 + 30);
		text(`${age4Count} Deaths: ${((age4Count / total) * 100).toFixed(1)}%`, age4ClusterX, windowHeight*8.7/10 + 30);
		text(`${unknownAgeCount} Deaths: ${((unknownAgeCount / total) * 100).toFixed(1)}%`, unknownAgeClusterX, windowHeight*8.7/10 + 30);
		pop();
		
		drawKerisGlow();
		
let hoveredDot = null;

dots.forEach(dot => {
  dot.update();
  dot.display();
	dot.drawGlow();
  if (dot.hovered()) {
    hoveredDot = dot;
  }
});

if (hoveredDot) {
  hoveredDot.showPopup();
}

		
		if (dots.every(dot => dot.settled)) {
		  timer6++;
  if (timer6 > 60) {
    allowInput = true;
  }
    push();
    fill(255, 255, 255, map(timer6, 0, 90, 0, 255));
    textFont(regularFont);
    textSize(28);
    textAlign(LEFT);
    textWrap(WORD);
    text(
      "No matter how the data is disaggregated, Keris blends into the crowd. Without more detailed recording, the humanity of those who sacrifice to keep our country working will always be erased. This particularly hurts marginalized people: older, working class employees are more likely to die, and more likely to be overlooked.",
      windowWidth * 1/8,
      75,
      windowWidth * 6/8
    );
			
			
    pop();			
			
		}
	}
	
	else if (clickState === 7) {
	const fallCount = dots.filter(dot => dot.death.category === "Falls").length;
  const bluntCount = dots.filter(dot => dot.death.category === "Blunt Force/Struck By Objects").length;
  const medicalCount = dots.filter(dot => dot.death.category === "Medical Events").length;
	const crushedCount = dots.filter(dot => dot.death.category === "Crushed/Caught Between").length;
	const vehicleCount = dots.filter(dot => dot.death.category === "Vehicle Accidents").length;
	const otherCategoryCount = 1849 - fallCount - bluntCount - medicalCount - crushedCount - vehicleCount;
	const total = 1849;
		
	push();
  fill(255);
  textSize(28);
	textFont(boldFont);
  textAlign(CENTER);

  // Draw labels for each category
  text("Falls", fallClusterX, windowHeight - 20);
  text("Blunt Force", bluntForceClusterX, windowHeight - 20);
  text("Medical Events", medicalEventsClusterX, windowHeight - 20);
  text("Crushing", crushingClusterX, windowHeight - 20);
  text("Vehicle Accidents", vehicleClusterX, windowHeight - 20);
  text("Other", otherClusterX, windowHeight - 20);
	
	textSize(24);
	textFont(regularFont);
	text(`${fallCount} Deaths\n${((fallCount / total) * 100).toFixed(1)}%`, fallClusterX + 2, windowHeight-fallClusterY - 100);
  text(`${bluntCount} Deaths\n${((bluntCount / total) * 100).toFixed(1)}%`, bluntForceClusterX + 2, windowHeight-bluntForceClusterY - 100);
  text(`${medicalCount} Deaths\n${((medicalCount / total) * 100).toFixed(1)}%`, medicalEventsClusterX +2, windowHeight-medicalEventsClusterY - 100);
  text(`${crushedCount} Deaths\n${((crushedCount / total) * 100).toFixed(1)}%`, crushingClusterX + 2, windowHeight-crushingClusterY - 100);
  text(`${vehicleCount} Deaths\n${((vehicleCount / total) * 100).toFixed(1)}%`, vehicleClusterX+2, windowHeight-vehicleClusterY - 100);
  text(`${otherCategoryCount} Deaths\n${((otherCategoryCount / total) * 100).toFixed(1)}%`, otherClusterX+2, windowHeight-otherClusterY - 100);

	pop();
		
		  let hoveredDot = null;

  dots.forEach(dot => {
    dot.update();
    dot.display();
    dot.drawGlow();
    if (dot.hovered()) {
      hoveredDot = dot;
    }
  });

  if (hoveredDot) {
    hoveredDot.showPopup();
  }
		
		if (dots.every(dot => dot.settled)) {
	 timer7++;
	 push();
	 fill(255, 255, 255, map(timer7, 0, 70, 0, 255));
	 textSize(28);
	 textAlign(LEFT);
	 textWrap(WORD);
	 text("Despite the tragic nature of these disparities, change is not beyond reach. Each of the top causes of death is preventable with stronger regulations, access to better safety equipment, and workplaces that prioritize human life over profit.", windowWidth* 1/6, 75, windowWidth* 4/6);
	 pop();
	 }
		
	}
	
else if (clickState === 8) {
  fadeOutTimer++;

  if (globalOpacity > 0) {
    globalOpacity -= 5;
  }

  // Apply fading to all dots
  dots.forEach(dot => {
    push();
    fill(red(dot.color), green(dot.color), blue(dot.color), max(globalOpacity, 0)); // Ensure opacity does not go negative
    noStroke();
    circle(dot.x, dot.y, dot.size);
    pop();
  });

  // Fade Keris's dot and glow
  if (kerisDot) {
    push();
    noStroke();

    // Fade Keris's glow
    for (let i = 5; i > 0; i--) {
      fill(255, 50 * i, 100 * (6 - i), max(globalOpacity / 2, 0)); // Ensure opacity does not go negative
      circle(kerisDot.x, kerisDot.y, kerisDot.size * (2 + i * 0.25));
    }

    // Fade the main dot
    fill(255, max(globalOpacity, 0)); // White core
    circle(kerisDot.x, kerisDot.y, kerisDot.size * 2);

    pop();
  }

  if (globalOpacity <= 0 && dots.length > 0) {
    dots = []; // Clear dots array
    kerisDot = null; // Clear Keris's dot reference
  }

  push();
  textSize(30);
  textAlign(LEFT);
  textFont(regularFont);
  fill(255, map(fadeOutTimer, 50, 180, 0, 255));
  textWrap(WORD);
  text(
    'The stories of people like Keris are a reminder that nobody should be reduced to a statistic. Behind each report is a life, a family, and a future lost.',
    50,
    60,
    windowWidth - 100
  );

  textSize(40);
  textFont(boldFont);
  fill(255, map(fadeOutTimer, 180, 380, 0, 255));
  textWrap(WORD);
  text(
    "Honor those we’ve lost by demanding change, advocating for safer working conditions, and refusing to let their stories and sacrifices be forgotten. Let’s get to work.",
    50,
    windowHeight / 3,
    windowWidth - 100
  );
  pop();
}


}

function drawKerisGlow() {
  if (kerisDot) {
    push();
    noStroke();

    // Draw concentric circles for the glow
    for (let i = 5; i > 0; i--) {
      fill(255, 50 * i, 100 * (6 - i), 50); // Gradient effect: adjust alpha for each layer
      circle(kerisDot.x, kerisDot.y, kerisDot.size * (2 + i * 0.25)); // Larger circles for outer glow
    }

    // Draw the main dot
    fill(255, 255, 255, 255); // White core
    circle(kerisDot.x, kerisDot.y, kerisDot.size * 2);

    pop();
  }
}


function keyPressed() {
	if (!allowInput) return;
	
  if (state === "intro") {
    if (keyCode === RIGHT_ARROW && dots.every((dot) => dot.settled)) {
      clickState++;
      if (clickState > 2) {
        state = "animation";
        clickState = 3;
      } else {
        introCounter = 0;
      }
    } else if (keyCode === LEFT_ARROW) {
      clickState--;
      if (clickState < 0) {
        clickState = 0;
      } 
			else if (clickState === 8){
				clickState = 8;
			}
			else {
        introCounter = 0;
      }
    }
  } else if (state === "animation") {
    if (animationPaused && keyCode === RIGHT_ARROW) {
      animationPaused = false;
    } else if (dots.every((dot) => dot.settled)) {
      if (keyCode === RIGHT_ARROW) {
        changeState(clickState + 1);
      }
    }

    if (keyCode === LEFT_ARROW) {
			if(clickState >= 4 && clickState != 8){
				changeState(clickState - 1);
			}
      else if (clickState === 3) {
        state = "intro";
        clickState = 2;
      }
    }
  }
}





function setupGrid() {
  const cols = 4;
  const rows = 3;
  cellWidth = width / cols;
  cellHeight = (height - 120) / rows;

  for (let i = 0; i < 12; i++) {
    const col = i % cols; // Column index
    const row = Math.floor(i / cols); // Row index
    monthsGrid.push({
      x: col * cellWidth + cellWidth / 2, // Center X of the cell
      y: row * cellHeight + 110 + cellHeight / 2, // Center Y of the cell
    });
  }
}
function drawDeathCounter() {
  textFont(boldFont);
  fill(255, deathCounterOpacity);
  textSize(50);
  textAlign(LEFT);
  text(`${deathCounter}`, 50, 65);

  textFont(regularFont);
  textSize(25);
  text("People killed", 50, 97);
}


function drawCurrentDay() 
{
  textFont(regularFont);
	fill(255);
  textSize(30);
  textAlign(RIGHT);

  if (currentDay) {
    text(currentDay, windowWidth - 50, 60); // Display the formatted date
  }
}

// Dot class for animations
class Dot {
  constructor(x, y, targetX, targetY, death) {
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.size = random(5, 15);
    this.color = color(random(150, 255), 100, 100, 150);
    this.settled = false;
    this.death = death;
  }

  update() {
    if (!this.settled) {
      this.x = lerp(this.x, this.targetX, 0.05);
      this.y = lerp(this.y, this.targetY, 0.05);

      if (dist(this.x, this.y, this.targetX, this.targetY) < 5) {
        this.settled = true;
      }
    }
  }

  display() {
    fill(this.color);
    noStroke();
    circle(this.x, this.y, this.size);
  }

  hovered() {
    return dist(mouseX, mouseY, this.x, this.y) < this.size / 2;
  }

  drawGlow() {
    if (this.hovered()) {
      push();
      noStroke();
      for (let i = 3; i > 0; i--) {
        fill(255, 200, 100, 50 / i); // Glow gradient
        circle(this.x, this.y, this.size * (1.25 + i * 0.3));
      }
      pop();
    }
  }


showPopup() {
  if (this.hovered()) {
    const padding = 10;
    const xOffset = 15;
    const yOffset = 15;
    const maxWidth = 300; // Maximum width for the popup content

    // Format the text based on the death details
    const article = this.death.sex === "M" ? "a" : this.death.sex === "F" ? "a" : "an";
    const genderText = this.death.sex === "M" ? "man" : this.death.sex === "F" ? "woman" : "unknown person";
    const ageText = this.death.age ? `${this.death.age}-year-old ` : "";
    const formattedKeywords = this.death.keywords.replace(/,/g, ', ');
    const mainText = `On ${this.death.date.toLocaleDateString("en-US", { month: "long", day: "numeric" })}, ${article} ${ageText}${genderText} was killed.`;
    const descriptionText = `OSHA Recorded Description: ${this.death.description}`;
    const keywordsText = `Recorded Keywords: ${formattedKeywords}`;

    // Calculate text heights
    const boldFontSize = 12;
    const regularFontSize = 12;
    const boldHeight = getTextHeight(mainText, boldFont, boldFontSize, maxWidth);
    const regularText = `${descriptionText}\n${keywordsText}`;
    const regularHeight = getTextHeight(regularText, regularFont, regularFontSize, maxWidth);

    const popupWidth = maxWidth;
    const popupHeight = boldHeight + regularHeight + 3 * padding;

    let xPos = mouseX + xOffset;
    let yPos = mouseY + yOffset;

    if (xPos + popupWidth > width) xPos -= popupWidth + xOffset * 2;
    if (yPos + popupHeight > height) yPos -= popupHeight + yOffset * 2;

    push();
    fill(50, 50, 50, 240);
    stroke(255, 200);
    strokeWeight(2);
    rectMode(CORNER);
    rect(xPos, yPos - padding, popupWidth, popupHeight + 10, 10); // Rounded corners
    pop();

    let textY = yPos + padding;

    push();
    fill(255);
    textSize(boldFontSize);
    textFont(boldFont);
    text(mainText, xPos + padding, textY, maxWidth - 2 * padding);
    textY += boldHeight;
    pop();

    push();
    fill(255);
    textSize(regularFontSize);
    textFont(regularFont);
    text(regularText, xPos + padding, textY, maxWidth - 2 * padding);
    pop();
  }
}


}


function changeState(newState) {
  clickState = newState;
	
	if (clickState < 8 && dots.length === 0) {
    // Repopulate dots using the `deaths` data
    deaths.forEach(death => {
      const cell = monthsGrid[death.month];
      const randomX = random(cell.x - cellWidth / 2, cell.x + cellWidth / 2);
      const randomY = random(cell.y - cellHeight / 2, cell.y + cellHeight / 2);
      const dot = new Dot(random(width), random(height), randomX, randomY, death);
      dots.push(dot);
    });
  }

  dots.forEach((dot, index) => {
    if (clickState === 4) {
      // Gender clustering
      const gender = dot.death.sex;
      const maxRadius = gender === "M" ? windowHeight*1/3 : gender === "F" ? windowHeight*1/10 : windowHeight*1/8;
      const radius = random(maxRadius);
      const angle = random(TWO_PI);

      if (gender === "M") {
        dot.targetX = maleClusterX + cos(angle) * radius;
        dot.targetY = maleClusterY + sin(angle) * radius;
        dot.color = color(100, 150, 250, 150);
				
      } else if (gender === "F") {
        dot.targetX = femaleClusterX + cos(angle) * radius;
        dot.targetY = femaleClusterY + sin(angle) * radius;
        dot.color = color(240, 98, 158, 150);
      } else {
        dot.targetX = unknownClusterX + cos(angle) * radius;
        dot.targetY = unknownClusterY + sin(angle) * radius;
        dot.color = color(200, 200, 200, 150);
      }
			  dot.state5X = dot.targetX;
        dot.state5Y = dot.targetY;
    } 
		
else if (clickState === 5) {
    dots.forEach(dot => {
        dot.targetX = dot.state5X;
        dot.targetY = dot.state5Y;
        dot.settled = false;
    });
    timer5 = 0;
}
		else if (clickState === 6) {
			allowInput = false;
			timer6 = 0;
      // Age clustering
      const age = dot.death.age;
      const maxRadius = windowHeight*1/5;
			const maxRadiusSmaller = windowHeight* 1/7;
      const radius = random(maxRadius);
			const smallerRadius = random(maxRadiusSmaller)
      const angle = random(TWO_PI);

      if (age !== null && age!=0 && age < 30) {
        dot.targetX = age1ClusterX + cos(angle) * radius;
        dot.targetY = clusterY + sin(angle) * radius;
        dot.color = color(67, 139, 129, 150); // Green for young
      } else if (age >= 30 && age < 50) {
        dot.targetX = age2ClusterX + cos(angle) * radius;
        dot.targetY = clusterY + sin(angle) * radius;
        dot.color = color(194, 206, 179, 150); // Yellow for middle-aged
      } else if (age >= 50 && age < 70) {
        dot.targetX = age3ClusterX + cos(angle) * radius;
        dot.targetY = clusterY + sin(angle) * radius;
        dot.color = color(236, 189, 143, 150); // Red for old
      }
			else if (age >= 70) {
        dot.targetX = age4ClusterX + cos(angle) * smallerRadius;
        dot.targetY = clusterY + sin(angle) * smallerRadius;
        dot.color = color(193, 73, 28, 150); // Red for old
      }
			else {
        dot.targetX = unknownAgeClusterX + cos(angle) * smallerRadius;
        dot.targetY = clusterY + sin(angle) * smallerRadius;
        dot.color = color(200, 200, 200, 150); // Gray for unknown age
      }
    } else if (clickState === 3) {
      // Reset to default state
      const cell = monthsGrid[dot.death.month];
      dot.targetX = random(cell.x - cellWidth / 2, cell.x + cellWidth / 2);
      dot.targetY = random(cell.y - cellHeight / 2, cell.y + cellHeight / 2);
      dot.color = color(random(150, 255), 100, 100, 150);
    }
		
		else if (clickState === 7) {
			timer7 = 0;
  dots.forEach(dot => {
    const category = dot.death.category;

    // Define target positions based on category
    if (category === "Falls") {
      dot.targetX = fallClusterX + random(-50, 50);
      dot.targetY = windowHeight - random(0, fallClusterY) - 50;
      dot.color = color(32, 99, 155, 150); // Blue for falls rgb(32, 99, 155)
    } else if (category === "Blunt Force/Struck By Objects") {
      dot.targetX = bluntForceClusterX + random(-50, 50);
      dot.targetY = windowHeight - random(0, bluntForceClusterY) - 50;
      dot.color = color(237, 85, 59, 150); // Red for blunt force //rgb(237, 85, 59)
    } else if (category === "Medical Events") {
      dot.targetX = medicalEventsClusterX + random(-50, 50);
      dot.targetY = windowHeight - random(0, medicalEventsClusterY) - 50;
      dot.color = color(60, 174, 163, 150); // Green for medical events rgb(60, 174, 163)
    } else if (category === "Crushed/Caught Between") {
      dot.targetX = crushingClusterX + random(-50, 50);
      dot.targetY = windowHeight - random(0, crushingClusterY) - 50;
      dot.color = color(246, 213, 92, 150); // Yellow for crushing rgb(246, 213, 92)
    } else if (category === "Vehicle Accidents") {
      dot.targetX = vehicleClusterX + random(-50, 50);
      dot.targetY = windowHeight - random(0, vehicleClusterY) - 50;
      dot.color = color(111, 53, 157, 150); // Pink for vehicle accidents rgb(111, 53, 157)
    } else {
      dot.targetX = otherClusterX + random(-50, 50);
      dot.targetY = windowHeight - random(0, otherClusterY) - 50;
      dot.color = color(200, 200, 200, 150); // Gray for others
    }

    dot.settled = false; // Reset settled status
  });
}
 else if (clickState === 8) {
    fadeOutTimer = 0;
    globalOpacity = 255; // Reset opacity
  }

    dot.settled = false;
  });
}

function getTextHeight(text, font, fontSize, maxWidth) {
  textFont(font);
  textSize(fontSize);
  textAlign(LEFT);

  // Split the text into words and calculate line breaks
  const words = text.split(' ');
  let line = '';
  let lineHeight = textSize() * 1.2; // Adjust line height
  let totalHeight = 0;

  words.forEach(word => {
    let testLine = line + word + ' ';
    if (textWidth(testLine) > maxWidth && line.length > 0) {
      totalHeight += lineHeight;
      line = word + ' ';
    } else {
      line = testLine;
    }
  });

  // Add height for the last line
  totalHeight += lineHeight;

  return totalHeight;
}



