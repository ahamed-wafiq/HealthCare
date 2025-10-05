import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
// Use a different default port than Vite to avoid conflicts
const PORT = process.env.PORT ? Number(process.env.PORT) : 8081;

app.use(express.json());

// Frontend origin (must be scheme://host:port). For this repo Vite defaults to :8080
const devOrigin = process.env.VITE_DEV_ORIGIN || 'http://localhost:8080';
app.use(
  cors({
    origin: devOrigin,
  })
);

// Basic rate limiter (tune for your usage)
const limiter = rateLimit({
  windowMs: 60_000, // 1 minute
  max: 30, // max requests per IP per windowMs
});
app.use(limiter);

app.post('/api/AIChat', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question || typeof question !== 'string' || !question.trim()) {
      return res.status(400).json({ error: 'question (non-empty string) is required' });
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY missing in environment');
      return res.status(500).json({ error: 'Server misconfiguration: OPENAI_API_KEY missing' });
    }

    // Temporary mock response for development when API quota is exceeded
    if (process.env.USE_MOCK_RESPONSE === 'true') {
      console.log('Using mock response for development');
      
      // Comprehensive healthcare-focused responses based on question content
      const lowerQuestion = question.toLowerCase();
      let mockAnswer = '';
      
      // Emergency and urgent conditions
      if (lowerQuestion.includes('chest pain') || lowerQuestion.includes('chest discomfort') || lowerQuestion.includes('heart attack') || lowerQuestion.includes('cardiac')) {
        mockAnswer = `🚨 URGENT: Chest pain requires immediate medical attention!

Chest pain can indicate serious conditions like heart attack, angina, or other cardiac issues. 

IMMEDIATE ACTION REQUIRED:
• If you have chest pain, pressure, or tightness - CALL 911 NOW
• Don't wait to see if it gets better
• Don't drive yourself to the hospital
• Stay calm and follow emergency operator instructions

Common signs of heart attack:
• Chest pain or pressure
• Pain in arms, neck, jaw, or back
• Shortness of breath
• Nausea or vomiting
• Cold sweat
• Lightheadedness

⚠️ This is a medical emergency. Call 911 immediately for chest pain.

[This is a mock response - real AI would provide more detailed assessment]`;
      }
      // Headache and migraine
      else if (lowerQuestion.includes('headache') || lowerQuestion.includes('migraine') || lowerQuestion.includes('head pain')) {
        mockAnswer = `I understand you're experiencing a headache. Here's some helpful information:

COMMON HEADACHE TYPES:
• Tension headaches: Mild to moderate pain, often stress-related
• Migraines: Severe, throbbing pain, often with nausea/sensitivity to light
• Cluster headaches: Intense pain around one eye

GENERAL RELIEF MEASURES:
• Rest in a dark, quiet room
• Apply cold compress to forehead
• Stay hydrated
• Gentle neck and shoulder stretches
• Over-the-counter pain relievers (follow package instructions)

SEEK MEDICAL ATTENTION IF:
• Sudden, severe headache (worst of your life)
• Headache with fever, stiff neck, or rash
• Headache after head injury
• Changes in vision or speech
• Weakness or numbness

⚠️ Always consult your healthcare provider for persistent or severe headaches.

[This is a mock response - real AI would provide more detailed guidance]`;
      }
      // Fever and temperature
      else if (lowerQuestion.includes('fever') || lowerQuestion.includes('temperature') || lowerQuestion.includes('hot')) {
        mockAnswer = `Fever management guidance:

NORMAL TEMPERATURE: 98.6°F (37°C)
FEVER: 100.4°F (38°C) or higher

FEVER MANAGEMENT:
• Rest and stay hydrated
• Light clothing and cool environment
• Lukewarm baths (not cold)
• Over-the-counter fever reducers (acetaminophen/ibuprofen)
• Monitor temperature regularly

SEEK MEDICAL ATTENTION FOR:
• Fever over 103°F (39.4°C)
• Fever lasting more than 3 days
• Fever with severe headache, stiff neck, or rash
• Difficulty breathing
• Signs of dehydration
• Fever in infants under 3 months

⚠️ Always consult your healthcare provider for persistent fever or concerning symptoms.

[This is a mock response - real AI would provide more detailed fever management]`;
      }
      // Stomach and digestive issues
      else if (lowerQuestion.includes('stomach') || lowerQuestion.includes('nausea') || lowerQuestion.includes('vomit') || lowerQuestion.includes('diarrhea')) {
        mockAnswer = `Digestive issue guidance:

FOR NAUSEA/VOMITING:
• Small sips of clear fluids (water, broth, electrolyte drinks)
• Avoid solid foods initially
• Rest and avoid strong smells
• Ginger tea or ginger candies may help
• BRAT diet when ready: Bananas, Rice, Applesauce, Toast

FOR DIARRHEA:
• Stay hydrated with electrolyte solutions
• Avoid dairy, caffeine, and fatty foods initially
• Eat bland, low-fiber foods
• Consider probiotics

SEEK MEDICAL ATTENTION FOR:
• Severe dehydration (dry mouth, no urination, dizziness)
• Blood in vomit or stool
• Severe abdominal pain
• High fever with digestive symptoms
• Symptoms lasting more than 2-3 days

⚠️ Always consult your healthcare provider for persistent digestive issues.

[This is a mock response - real AI would provide more detailed digestive guidance]`;
      }
      // Sleep issues
      else if (lowerQuestion.includes('sleep') || lowerQuestion.includes('insomnia') || lowerQuestion.includes('tired') || lowerQuestion.includes('fatigue')) {
        mockAnswer = `Sleep and fatigue guidance:

HEALTHY SLEEP HABITS:
• Consistent sleep schedule (same bedtime/wake time)
• 7-9 hours of sleep per night
• Cool, dark, quiet bedroom
• No screens 1 hour before bed
• Regular exercise (but not close to bedtime)
• Limit caffeine after 2 PM
• Avoid large meals before bed

SLEEP HYGIENE TIPS:
• Relaxing bedtime routine
• Comfortable mattress and pillows
• White noise or earplugs if needed
• Keep bedroom only for sleep and intimacy

SEEK MEDICAL ATTENTION FOR:
• Chronic insomnia (3+ nights/week for 3+ months)
• Excessive daytime sleepiness
• Sleep apnea symptoms (snoring, gasping, frequent waking)
• Restless leg syndrome

⚠️ Always consult your healthcare provider for persistent sleep issues.

[This is a mock response - real AI would provide more detailed sleep guidance]`;
      }
      // Medication questions
      else if (lowerQuestion.includes('medication') || lowerQuestion.includes('drug') || lowerQuestion.includes('pill') || lowerQuestion.includes('medicine')) {
        mockAnswer = `Medication safety guidance:

IMPORTANT MEDICATION PRINCIPLES:
• Always follow your doctor's prescribed dosage and schedule
• Read medication labels and instructions carefully
• Never share medications with others
• Store medications properly (cool, dry place, away from children)
• Check expiration dates regularly
• Inform all healthcare providers about all medications you take

DRUG INTERACTIONS:
• Some medications can interact with each other
• Some foods can affect medication absorption
• Alcohol can interact with many medications
• Always ask your pharmacist about potential interactions

SIDE EFFECTS:
• Report any unusual symptoms to your healthcare provider
• Some side effects are normal, others require immediate attention
• Keep a medication diary if helpful

⚠️ Always consult your healthcare provider or pharmacist for medication-related questions.

[This is a mock response - real AI would provide more detailed medication guidance]`;
      }
      // Emergency situations
      else if (lowerQuestion.includes('emergency') || lowerQuestion.includes('urgent') || lowerQuestion.includes('help') || lowerQuestion.includes('911')) {
        mockAnswer = `🚨 EMERGENCY GUIDANCE:

CALL 911 IMMEDIATELY FOR:
• Chest pain or pressure
• Difficulty breathing or shortness of breath
• Severe bleeding that won't stop
• Signs of stroke (facial drooping, arm weakness, speech difficulties)
• Severe allergic reactions
• Loss of consciousness
• Severe burns or injuries
• Suspected poisoning
• Severe abdominal pain
• High fever with stiff neck or rash

WHEN CALLING 911:
• Stay calm and speak clearly
• Provide your exact location
• Describe the emergency
• Follow the operator's instructions
• Don't hang up until told to do so

NON-EMERGENCY URGENT CARE:
• Contact your healthcare provider
• Visit urgent care center
• Use telehealth services if available

⚠️ When in doubt, call 911. It's better to be safe than sorry.

[This is a mock response - real AI would provide more detailed emergency guidance]`;
      }
      // General health and wellness
      else if (lowerQuestion.includes('exercise') || lowerQuestion.includes('workout') || lowerQuestion.includes('fitness')) {
        mockAnswer = `Exercise and fitness guidance:

RECOMMENDED EXERCISE:
• 150 minutes of moderate-intensity aerobic activity per week
• OR 75 minutes of vigorous-intensity activity per week
• Muscle-strengthening activities 2+ days per week
• Include flexibility and balance exercises

BENEFITS OF REGULAR EXERCISE:
• Improved cardiovascular health
• Stronger muscles and bones
• Better mental health and mood
• Weight management
• Better sleep quality
• Reduced risk of chronic diseases

EXERCISE SAFETY:
• Start slowly and gradually increase intensity
• Warm up before and cool down after
• Stay hydrated
• Listen to your body
• Consult your doctor before starting new exercise programs

⚠️ Always consult your healthcare provider before starting a new exercise program.

[This is a mock response - real AI would provide more detailed fitness guidance]`;
      }
      // Nutrition and diet
      else if (lowerQuestion.includes('diet') || lowerQuestion.includes('food') || lowerQuestion.includes('nutrition') || lowerQuestion.includes('eat')) {
        mockAnswer = `Nutrition and diet guidance:

HEALTHY EATING PRINCIPLES:
• Eat a variety of fruits and vegetables (5+ servings daily)
• Choose whole grains over refined grains
• Include lean proteins (fish, poultry, beans, nuts)
• Limit saturated and trans fats
• Reduce sodium intake
• Stay hydrated with water
• Limit added sugars

PORTION CONTROL:
• Use smaller plates
• Eat slowly and mindfully
• Stop when you feel satisfied, not full
• Read nutrition labels

SPECIAL DIETARY CONSIDERATIONS:
• Consult a dietitian for specific dietary needs
• Consider food allergies and intolerances
• Some medical conditions require special diets

⚠️ Always consult your healthcare provider or registered dietitian for personalized nutrition advice.

[This is a mock response - real AI would provide more detailed nutrition guidance]`;
      }
      // Mental health and psychological conditions
      else if (lowerQuestion.includes('anxiety') || lowerQuestion.includes('depression') || lowerQuestion.includes('stress') || lowerQuestion.includes('mental') || lowerQuestion.includes('panic') || lowerQuestion.includes('bipolar') || lowerQuestion.includes('ptsd') || lowerQuestion.includes('ocd')) {
        mockAnswer = `Mental health support:

COMMON MENTAL HEALTH CONCERNS:
• Anxiety: Excessive worry, restlessness, difficulty concentrating
• Depression: Persistent sadness, loss of interest, fatigue
• Stress: Feeling overwhelmed, irritable, difficulty sleeping
• Panic attacks: Sudden intense fear with physical symptoms
• Bipolar disorder: Extreme mood swings between depression and mania
• PTSD: Flashbacks, nightmares after traumatic events
• OCD: Obsessive thoughts and compulsive behaviors

COPING STRATEGIES:
• Practice deep breathing and relaxation techniques
• Maintain regular sleep schedule
• Exercise regularly
• Connect with supportive friends and family
• Practice mindfulness or meditation
• Limit alcohol and caffeine
• Seek professional help when needed

WHEN TO SEEK HELP:
• Persistent symptoms affecting daily life
• Thoughts of self-harm or suicide
• Difficulty functioning at work, school, or home
• Substance use to cope with emotions

CRISIS RESOURCES:
• National Suicide Prevention Lifeline: 988
• Crisis Text Line: Text HOME to 741741
• Emergency: Call 911

⚠️ Always consult mental health professionals for persistent mental health concerns.

[This is a mock response - real AI would provide more detailed mental health guidance]`;
      }
      // Respiratory conditions
      else if (lowerQuestion.includes('cough') || lowerQuestion.includes('breathing') || lowerQuestion.includes('asthma') || lowerQuestion.includes('bronchitis') || lowerQuestion.includes('pneumonia') || lowerQuestion.includes('respiratory')) {
        mockAnswer = `Respiratory health guidance:

COMMON RESPIRATORY CONDITIONS:
• Asthma: Chronic airway inflammation causing wheezing and shortness of breath
• Bronchitis: Inflammation of bronchial tubes, often with persistent cough
• Pneumonia: Lung infection causing fever, cough, and difficulty breathing
• COPD: Chronic obstructive pulmonary disease, often from smoking
• Common cold: Viral infection with runny nose, cough, congestion

SYMPTOMS TO MONITOR:
• Persistent cough (more than 2-3 weeks)
• Shortness of breath or wheezing
• Chest pain when breathing
• High fever with respiratory symptoms
• Coughing up blood or colored mucus

MANAGEMENT TIPS:
• Stay hydrated and rest
• Use humidifier for dry air
• Avoid smoking and secondhand smoke
• Practice deep breathing exercises
• Use prescribed inhalers as directed

SEEK MEDICAL ATTENTION FOR:
• Difficulty breathing or rapid breathing
• High fever with respiratory symptoms
• Persistent cough with blood
• Severe chest pain
• Blue lips or fingernails

⚠️ Always consult your healthcare provider for persistent respiratory symptoms.

[This is a mock response - real AI would provide more detailed respiratory guidance]`;
      }
      // Skin conditions
      else if (lowerQuestion.includes('skin') || lowerQuestion.includes('rash') || lowerQuestion.includes('acne') || lowerQuestion.includes('eczema') || lowerQuestion.includes('psoriasis') || lowerQuestion.includes('dermatitis') || lowerQuestion.includes('mole') || lowerQuestion.includes('wart')) {
        mockAnswer = `Skin health guidance:

COMMON SKIN CONDITIONS:
• Acne: Clogged pores causing pimples, blackheads, whiteheads
• Eczema (Atopic Dermatitis): Itchy, inflamed, dry skin patches
• Psoriasis: Rapid skin cell growth causing thick, scaly patches
• Contact Dermatitis: Skin reaction to irritants or allergens
• Rosacea: Facial redness, visible blood vessels, sometimes bumps

SKIN CARE BASICS:
• Gentle cleansing with mild soap
• Moisturize regularly, especially after bathing
• Use sunscreen (SPF 30+) daily
• Avoid harsh scrubbing or picking
• Keep skin clean and dry

WARNING SIGNS TO WATCH:
• New or changing moles (ABCDE rule: Asymmetry, Border, Color, Diameter, Evolution)
• Persistent rash that doesn't improve
• Skin lesions that bleed or don't heal
• Severe itching or pain
• Signs of infection (redness, warmth, pus)

SEEK MEDICAL ATTENTION FOR:
• Suspicious moles or skin changes
• Severe or persistent rashes
• Signs of skin infection
• Skin conditions affecting daily life

⚠️ Always consult a dermatologist for persistent skin concerns.

[This is a mock response - real AI would provide more detailed dermatology guidance]`;
      }
      // Eye and vision problems
      else if (lowerQuestion.includes('eye') || lowerQuestion.includes('vision') || lowerQuestion.includes('blurry') || lowerQuestion.includes('glaucoma') || lowerQuestion.includes('cataract') || lowerQuestion.includes('conjunctivitis') || lowerQuestion.includes('dry eye')) {
        mockAnswer = `Eye and vision health guidance:

COMMON EYE CONDITIONS:
• Dry Eye: Insufficient tear production causing irritation
• Conjunctivitis (Pink Eye): Eye inflammation causing redness and discharge
• Cataracts: Clouding of the eye's lens affecting vision
• Glaucoma: Increased eye pressure damaging optic nerve
• Macular Degeneration: Deterioration of central vision

VISION SYMPTOMS TO MONITOR:
• Blurry or double vision
• Sudden vision loss or changes
• Eye pain or pressure
• Redness, swelling, or discharge
• Sensitivity to light
• Seeing flashes or floaters

EYE CARE TIPS:
• Regular eye exams (every 1-2 years)
• Protect eyes from UV rays with sunglasses
• Take breaks from screens (20-20-20 rule)
• Don't rub eyes excessively
• Use artificial tears for dry eyes

URGENT EYE SYMPTOMS:
• Sudden vision loss
• Severe eye pain
• Eye injury or trauma
• Seeing halos around lights
• Severe headache with vision changes

⚠️ Always consult an ophthalmologist for vision changes or eye problems.

[This is a mock response - real AI would provide more detailed ophthalmology guidance]`;
      }
      // Ear, nose, and throat conditions
      else if (lowerQuestion.includes('ear') || lowerQuestion.includes('nose') || lowerQuestion.includes('throat') || lowerQuestion.includes('sinus') || lowerQuestion.includes('hearing') || lowerQuestion.includes('tinnitus') || lowerQuestion.includes('tonsil')) {
        mockAnswer = `Ear, Nose & Throat (ENT) health guidance:

COMMON ENT CONDITIONS:
• Sinusitis: Inflammation of sinuses causing congestion and pressure
• Ear Infections: Bacterial or viral infections causing ear pain
• Tonsillitis: Inflammation of tonsils causing sore throat
• Tinnitus: Ringing or buzzing in ears
• Allergic Rhinitis: Hay fever causing sneezing and congestion

SYMPTOMS TO MONITOR:
• Persistent ear pain or hearing loss
• Severe sore throat with difficulty swallowing
• Chronic nasal congestion or sinus pressure
• Ringing or buzzing in ears
• Frequent nosebleeds

MANAGEMENT TIPS:
• Use saline nasal sprays for congestion
• Apply warm compresses for sinus pressure
• Stay hydrated to thin mucus
• Avoid smoking and secondhand smoke
• Use humidifier in dry environments

SEEK MEDICAL ATTENTION FOR:
• Severe ear pain or hearing loss
• Difficulty breathing or swallowing
• Persistent fever with ENT symptoms
• Severe headache with sinus pressure
• Signs of infection (pus, severe pain)

⚠️ Always consult an ENT specialist for persistent ear, nose, or throat problems.

[This is a mock response - real AI would provide more detailed ENT guidance]`;
      }
      // Musculoskeletal conditions
      else if (lowerQuestion.includes('back pain') || lowerQuestion.includes('joint') || lowerQuestion.includes('arthritis') || lowerQuestion.includes('muscle') || lowerQuestion.includes('bone') || lowerQuestion.includes('spine') || lowerQuestion.includes('knee') || lowerQuestion.includes('shoulder')) {
        mockAnswer = `Musculoskeletal health guidance:

COMMON MUSCULOSKELETAL CONDITIONS:
• Back Pain: Often from muscle strain, poor posture, or disc issues
• Arthritis: Joint inflammation causing pain, stiffness, and swelling
• Osteoporosis: Weakened bones increasing fracture risk
• Muscle Strains: Overstretching or tearing of muscle fibers
• Tendinitis: Inflammation of tendons causing pain and stiffness

PAIN MANAGEMENT:
• Rest and avoid activities that worsen pain
• Apply ice for acute injuries (first 48 hours)
• Use heat for chronic pain and stiffness
• Gentle stretching and range-of-motion exercises
• Over-the-counter pain relievers as directed

PREVENTION STRATEGIES:
• Maintain good posture
• Regular exercise to strengthen muscles
• Proper lifting techniques (lift with legs, not back)
• Maintain healthy weight
• Adequate calcium and vitamin D intake

SEEK MEDICAL ATTENTION FOR:
• Severe or persistent pain
• Pain with numbness or weakness
• Difficulty walking or moving
• Signs of fracture (severe pain, deformity, inability to move)
• Pain that worsens at night

⚠️ Always consult your healthcare provider for persistent musculoskeletal pain.

[This is a mock response - real AI would provide more detailed musculoskeletal guidance]`;
      }
      // Neurological conditions
      else if (lowerQuestion.includes('dizzy') || lowerQuestion.includes('vertigo') || lowerQuestion.includes('seizure') || lowerQuestion.includes('epilepsy') || lowerQuestion.includes('migraine') || lowerQuestion.includes('stroke') || lowerQuestion.includes('neurological') || lowerQuestion.includes('numbness')) {
        mockAnswer = `Neurological health guidance:

COMMON NEUROLOGICAL CONDITIONS:
• Migraine: Severe headaches often with nausea and light sensitivity
• Vertigo/Dizziness: Sensation of spinning or loss of balance
• Epilepsy: Recurrent seizures due to abnormal brain activity
• Stroke: Brain damage from interrupted blood flow
• Peripheral Neuropathy: Nerve damage causing numbness and tingling

SYMPTOMS TO MONITOR:
• Severe headaches (especially sudden onset)
• Dizziness or loss of balance
• Numbness or tingling in limbs
• Muscle weakness or paralysis
• Changes in speech or vision
• Seizures or loss of consciousness

URGENT NEUROLOGICAL SYMPTOMS (CALL 911):
• Sudden severe headache (worst of your life)
• Sudden weakness or numbness (especially on one side)
• Sudden difficulty speaking or understanding
• Sudden vision changes
• Sudden severe dizziness or loss of balance
• Seizure or loss of consciousness

MANAGEMENT TIPS:
• Keep a headache diary to identify triggers
• Stay hydrated and maintain regular sleep
• Avoid known migraine triggers
• Practice stress management techniques

⚠️ Always consult a neurologist for persistent neurological symptoms.

[This is a mock response - real AI would provide more detailed neurological guidance]`;
      }
      // Endocrine and metabolic conditions
      else if (lowerQuestion.includes('diabetes') || lowerQuestion.includes('thyroid') || lowerQuestion.includes('hormone') || lowerQuestion.includes('blood sugar') || lowerQuestion.includes('insulin') || lowerQuestion.includes('metabolism') || lowerQuestion.includes('weight')) {
        mockAnswer = `Endocrine and metabolic health guidance:

COMMON ENDOCRINE CONDITIONS:
• Diabetes: High blood sugar due to insulin problems
• Thyroid Disorders: Overactive (hyperthyroid) or underactive (hypothyroid) thyroid
• Metabolic Syndrome: Cluster of conditions increasing heart disease risk
• PCOS: Polycystic ovary syndrome affecting hormones and metabolism

SYMPTOMS TO MONITOR:
• Frequent urination and excessive thirst (diabetes)
• Unexplained weight changes
• Fatigue and mood changes
• Changes in appetite
• Irregular menstrual cycles (women)

MANAGEMENT STRATEGIES:
• Regular blood sugar monitoring (if diabetic)
• Balanced diet with controlled carbohydrates
• Regular physical activity
• Medication adherence as prescribed
• Regular medical check-ups

WARNING SIGNS:
• Very high or very low blood sugar
• Severe fatigue or weakness
• Rapid weight changes
• Changes in mental status

⚠️ Always consult an endocrinologist for diabetes, thyroid, or hormone-related concerns.

[This is a mock response - real AI would provide more detailed endocrine guidance]`;
      }
      // Women's health
      else if (lowerQuestion.includes('pregnancy') || lowerQuestion.includes('pregnant') || lowerQuestion.includes('menstrual') || lowerQuestion.includes('period') || lowerQuestion.includes('menopause') || lowerQuestion.includes('breast') || lowerQuestion.includes('gynecological') || lowerQuestion.includes('ovarian') || lowerQuestion.includes('uterine') || lowerQuestion.includes('morning sickness') || lowerQuestion.includes('prenatal')) {
        mockAnswer = `Women's health guidance:

COMMON WOMEN'S HEALTH CONCERNS:
• Menstrual Irregularities: Changes in cycle length, flow, or symptoms
• Pregnancy-related Issues: Morning sickness, complications, prenatal care
• Menopause: Natural transition causing hormonal changes
• Breast Health: Lumps, pain, or changes in breast tissue
• PCOS: Polycystic ovary syndrome affecting hormones and fertility

IMPORTANT SCREENINGS:
• Regular Pap smears (every 3-5 years)
• Mammograms (starting age 40-50)
• Breast self-exams monthly
• Regular gynecological exams

PREGNANCY CARE:
• Regular prenatal visits
• Folic acid supplementation
• Avoid alcohol, smoking, and certain medications
• Maintain healthy weight and nutrition

MENOPAUSE MANAGEMENT:
• Hormone replacement therapy (if appropriate)
• Calcium and vitamin D for bone health
• Regular exercise and healthy diet
• Manage hot flashes and sleep disturbances

SEEK MEDICAL ATTENTION FOR:
• Irregular menstrual cycles
• Breast lumps or changes
• Severe pelvic pain
• Pregnancy complications
• Severe menopause symptoms

⚠️ Always consult a gynecologist for women's health concerns.

[This is a mock response - real AI would provide more detailed women's health guidance]`;
      }
      // Men's health
      else if (lowerQuestion.includes('prostate') || lowerQuestion.includes('testosterone') || lowerQuestion.includes('erectile') || lowerQuestion.includes('male') || lowerQuestion.includes('andropause')) {
        mockAnswer = `Men's health guidance:

COMMON MEN'S HEALTH CONCERNS:
• Prostate Health: Enlarged prostate (BPH) or prostate cancer
• Low Testosterone: Decreased energy, libido, and muscle mass
• Erectile Dysfunction: Difficulty achieving or maintaining erection
• Heart Disease: Higher risk in men, especially with age
• Mental Health: Often underdiagnosed in men

IMPORTANT SCREENINGS:
• Prostate exams (starting age 50, or 45 for high risk)
• Regular blood pressure and cholesterol checks
• Testosterone level testing if symptoms present
• Regular physical exams

LIFESTYLE FACTORS:
• Regular exercise and strength training
• Healthy diet with fruits, vegetables, and lean proteins
• Limit alcohol consumption
• Don't smoke
• Manage stress effectively

SEEK MEDICAL ATTENTION FOR:
• Urinary problems or changes
• Erectile dysfunction
• Low energy or mood changes
• Chest pain or shortness of breath
• Changes in testicular appearance

⚠️ Always consult a urologist or men's health specialist for specific concerns.

[This is a mock response - real AI would provide more detailed men's health guidance]`;
      }
      // Pediatric health
      else if (lowerQuestion.includes('baby') || lowerQuestion.includes('infant') || lowerQuestion.includes('child') || lowerQuestion.includes('pediatric') || lowerQuestion.includes('toddler') || lowerQuestion.includes('kids') || lowerQuestion.includes('vaccination') || lowerQuestion.includes('immunization')) {
        mockAnswer = `Pediatric health guidance:

COMMON PEDIATRIC CONCERNS:
• Fever in Children: Common symptom requiring monitoring
• Vaccinations: Essential for preventing serious diseases
• Growth and Development: Monitoring milestones and nutrition
• Common Childhood Illnesses: Colds, ear infections, stomach bugs
• Safety: Preventing accidents and injuries

FEVER GUIDELINES:
• Under 3 months: Any fever requires immediate medical attention
• 3-6 months: Fever over 101°F (38.3°C) needs evaluation
• 6+ months: Monitor symptoms, treat discomfort

VACCINATION SCHEDULE:
• Follow CDC recommended schedule
• Keep vaccination records updated
• Discuss any concerns with pediatrician
• Don't delay vaccinations without medical reason

GROWTH MONITORING:
• Regular well-child visits
• Track height, weight, and head circumference
• Monitor developmental milestones
• Address feeding and nutrition concerns

SAFETY PRIORITIES:
• Childproof home environment
• Use appropriate car seats and seatbelts
• Supervise around water and stairs
• Keep medications and chemicals locked away

⚠️ Always consult a pediatrician for children's health concerns.

[This is a mock response - real AI would provide more detailed pediatric guidance]`;
      }
      // Geriatric health
      else if (lowerQuestion.includes('elderly') || lowerQuestion.includes('senior') || lowerQuestion.includes('aging') || lowerQuestion.includes('dementia') || lowerQuestion.includes('alzheimer') || lowerQuestion.includes('falls') || lowerQuestion.includes('frailty')) {
        mockAnswer = `Geriatric health guidance:

COMMON GERIATRIC CONCERNS:
• Dementia/Alzheimer's: Memory loss and cognitive decline
• Falls Prevention: Major cause of injury in elderly
• Medication Management: Multiple medications and interactions
• Chronic Disease Management: Diabetes, heart disease, arthritis
• Social Isolation: Impact on mental and physical health

FALL PREVENTION:
• Remove tripping hazards at home
• Improve lighting throughout house
• Use assistive devices (canes, walkers) as needed
• Regular exercise to maintain strength and balance
• Regular vision and hearing checks

MEDICATION SAFETY:
• Keep updated medication list
• Use pill organizers
• Regular medication reviews with doctor
• Be aware of drug interactions
• Don't share medications

COGNITIVE HEALTH:
• Stay mentally active with puzzles, reading
• Maintain social connections
• Regular physical exercise
• Healthy diet (Mediterranean diet recommended)
• Manage chronic conditions well

SEEK MEDICAL ATTENTION FOR:
• Memory problems or confusion
• Frequent falls or balance issues
• Medication side effects
• Depression or social withdrawal
• Difficulty with daily activities

⚠️ Always consult a geriatrician for elderly health concerns.

[This is a mock response - real AI would provide more detailed geriatric guidance]`;
      }
      // Default response for other questions
      else {
        mockAnswer = `Thank you for your health question: "${question}"

As Dr. HealthBot, I'm designed to provide general health information and guidance. Here's how I would typically help:

FOR YOUR SPECIFIC QUESTION:
I would analyze your question and provide evidence-based health information, suggest when to seek medical attention, and offer general wellness guidance while emphasizing the importance of professional medical consultation.

GENERAL HEALTH PRINCIPLES:
• Listen to your body and don't ignore concerning symptoms
• Maintain regular check-ups with your healthcare provider
• Follow prescribed treatments and medications
• Practice preventive care and healthy lifestyle habits
• Seek immediate medical attention for emergencies

⚠️ IMPORTANT MEDICAL DISCLAIMER: I am not a replacement for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for serious medical concerns.

[This is a mock response - real AI would provide more specific guidance based on your question]`;
      }
      
      return res.status(200).json({ answer: mockAnswer });
    }

    const payload = {
      model: 'gpt-3.5-turbo',
      messages: [
        { 
          role: 'system', 
          content: `You are Dr. HealthBot, a knowledgeable healthcare AI assistant specializing in general medical information and health guidance. 

IMPORTANT MEDICAL DISCLAIMER: You are NOT a replacement for professional medical advice, diagnosis, or treatment. Always recommend consulting with qualified healthcare professionals for serious medical concerns.

Your expertise includes:
- General health information and wellness advice
- Common symptoms explanation and when to seek medical attention
- Medication information and interactions
- Preventive care and healthy lifestyle recommendations
- First aid and emergency guidance
- Chronic condition management support
- Mental health awareness and resources

Guidelines:
1. Always prioritize patient safety
2. Recommend professional medical consultation for serious symptoms
3. Provide evidence-based information when possible
4. Use clear, empathetic language
5. Include relevant disclaimers for medical advice
6. Suggest emergency services (911/emergency room) for urgent situations
7. Be supportive and non-judgmental
8. Focus on education and empowerment

Remember: You are a helpful assistant that provides general health information, not a licensed medical professional.` 
        },
        { role: 'user', content: question },
      ],
      max_tokens: 1000,
      temperature: 0.3,
    };

    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      let errText = await r.text().catch(() => '');
      try {
        const parsed = JSON.parse(errText);
        errText = parsed?.error?.message || JSON.stringify(parsed);
      } catch (e) {
        // keep raw errText
      }
      console.error('OpenAI API returned error:', r.status, errText);
      return res.status(r.status).json({ error: `OpenAI API error: ${errText || r.statusText}` });
    }

    const data: any = await r.json().catch((e) => {
      console.error('Failed to parse OpenAI response JSON', e);
      return null;
    });

    const answer = data?.choices?.[0]?.message?.content ?? data?.choices?.[0]?.text ?? null;

    if (!answer) {
      console.error('No answer returned from OpenAI response:', JSON.stringify(data));
      return res.status(500).json({ error: 'No answer returned from AI' });
    }

    return res.status(200).json({ answer });
  } catch (err: any) {
    console.error('AI fetch failed:', err?.stack ?? err);
    return res.status(500).json({
      error: `Server error making AI request${process.env.NODE_ENV !== 'production' ? `: ${err?.message}` : ''}`
    });
  }
});

// Centralized JSON error fallback for any uncaught errors (helps prevent HTML 500 responses)
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error('Unhandled error middleware:', err?.stack ?? err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`AI server listening on http://localhost:${PORT}`);
});