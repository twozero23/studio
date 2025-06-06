
"use client";
import jsPDF from 'jspdf';
import type { PortfolioData, ExperienceEntry, EducationEntry, Skill, ProjectEntry, AchievementHighlight, CustomSectionEntry, CommunityEntry, CertificationEntry } from './portfolio-data-types';

let yPos = 20; // Initial Y position
const A4_WIDTH = 210;
const A4_HEIGHT = 297;
const MARGIN = 15;
const CONTENT_WIDTH = A4_WIDTH - 2 * MARGIN;

// Revised Spacing Constants
const LINE_HEIGHT_FACTOR = 1.2; // Default line height for multi-line text
const SECTION_SPACING = 7;      // Space BEFORE a new L1 heading
const SUB_SECTION_SPACING = 3;  // Space BEFORE a new L2/L3 heading (if it's a new logical block)

const HEADING_L1_AFTER_SPACING = 2.5; // Space AFTER L1 heading text
const HEADING_L2_AFTER_SPACING = 1.5; // Space AFTER L2 heading text
const HEADING_L3_AFTER_SPACING = 1;   // Space AFTER L3 heading text (if used)

const BULLET_AFTER_SPACING = 1;   // Space AFTER each bullet point's text
const ITEM_BLOCK_SPACING = 1.5;   // General spacing between distinct text blocks within an entry (e.g., role and period)


function checkAndAddPage(doc: jsPDF, requiredHeight: number = 5) {
    if (yPos + requiredHeight > A4_HEIGHT - MARGIN) {
        doc.addPage();
        yPos = MARGIN;
    }
}

function addText(doc: jsPDF, text: string | string[], x: number, options?: any, isBold = false, fontSize?: number) {
    const originalDocFontName = doc.getFont().fontName;
    let originalDocFontStyle = doc.getFont().fontStyle; // Use let for reassignment
    const originalDocFontSize = doc.getFontSize();

    // Determine target style
    let targetStyle = originalDocFontStyle;
    if (isBold) {
        targetStyle = (originalDocFontStyle === 'italic' || originalDocFontStyle === 'bolditalic') ? 'bolditalic' : 'bold';
    } else {
        // If not bold, ensure it's not accidentally bold from a previous call
        if (originalDocFontStyle === 'bold') targetStyle = 'normal';
        else if (originalDocFontStyle === 'bolditalic') targetStyle = 'italic';
        // otherwise, it's already normal or italic, which is fine
    }
    doc.setFont(originalDocFontName, targetStyle);


    if (fontSize) {
        doc.setFontSize(fontSize);
    }

    const textOptions = {
        maxWidth: CONTENT_WIDTH,
        lineHeightFactor: LINE_HEIGHT_FACTOR,
        ...options, // Allow overriding maxWidth or lineHeightFactor if needed
    };

    // Ensure text is a string for splitTextToSize, even if it's a single-element array
    const textToSplit = Array.isArray(text) ? text.join('\n') : text.toString();
    const textLines = doc.splitTextToSize(textToSplit, textOptions.maxWidth);
    
    const dims = doc.getTextDimensions(textLines, textOptions);
    const actualBlockHeight = dims.h;

    checkAndAddPage(doc, actualBlockHeight);

    doc.text(textLines, x, yPos, textOptions);

    // Restore original font settings
    doc.setFont(originalDocFontName, originalDocFontStyle); // Use the initially captured fontStyle
    doc.setFontSize(originalDocFontSize);

    yPos += actualBlockHeight;
}


function addHeading(doc: jsPDF, text: string, level: 1 | 2 | 3 = 1) {
    // Space BEFORE the heading
    yPos += (level === 1 ? SECTION_SPACING : SUB_SECTION_SPACING);

    const headingFontSize = level === 1 ? 14 : (level === 2 ? 11 : 10);
    
    // Estimate height for page check (can be refined if needed)
    const estHeadingHeight = doc.getTextDimensions("Sample", {fontSize: headingFontSize, lineHeightFactor: LINE_HEIGHT_FACTOR}).h;
    checkAndAddPage(doc, estHeadingHeight);

    addText(doc, text, MARGIN, {}, true, headingFontSize);

    // Space AFTER the heading text
    if (level === 1) {
        yPos += HEADING_L1_AFTER_SPACING;
    } else if (level === 2) {
        yPos += HEADING_L2_AFTER_SPACING;
    } else {
        yPos += HEADING_L3_AFTER_SPACING;
    }
}

function addBulletPoint(doc: jsPDF, text: string, indent = 5) {
    const bulletText = `• ${text}`;
    // For bullet points, ensure maxWidth accounts for the indent and bullet itself
    const bulletOptions = { maxWidth: CONTENT_WIDTH - indent - 3, lineHeightFactor: LINE_HEIGHT_FACTOR };
    addText(doc, bulletText, MARGIN + indent, bulletOptions);
    yPos += BULLET_AFTER_SPACING;
}


export function generateResumePdf(data: PortfolioData) {
    const doc = new jsPDF('p', 'mm', 'a4');
    yPos = MARGIN;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);

    // --- Header ---
    addText(doc, data.name, A4_WIDTH / 2, { align: 'center' }, true, 18);
    yPos += ITEM_BLOCK_SPACING; // Space after name
    addText(doc, data.title, A4_WIDTH / 2, { align: 'center', lineHeightFactor: 1.1 }, false, 11); // slightly less line height for title
    yPos += ITEM_BLOCK_SPACING / 2; // Space after title

    let contactParts: string[] = [];
    if (data.contact.email) contactParts.push(data.contact.email);
    if (data.contact.phone) contactParts.push(data.contact.phone);
    if (data.contact.linkedin) contactParts.push(data.contact.linkedin.replace(/^(https?:\/\/)?(www\.)?/, ''));
    if (data.contact.github) contactParts.push(data.contact.github.replace(/^(https?:\/\/)?(www\.)?/, ''));
    
    const contactLine = contactParts.join(' | ');
    addText(doc, contactLine, A4_WIDTH / 2, { align: 'center', lineHeightFactor: 1.1 }, false, 9); // and contact
    // yPos implicitly updated by addText, no explicit yPos += here before next section heading

    // --- Summary ---
    if (data.summary) {
        addHeading(doc, 'Summary', 1);
        addText(doc, data.summary, MARGIN);
        // yPos += ITEM_BLOCK_SPACING; // Removed: addHeading adds HEADING_L1_AFTER_SPACING
    }

    // --- Experience ---
    if (data.experience && data.experience.length > 0) {
        addHeading(doc, 'Experience', 1);
        data.experience.forEach((exp, expIndex) => {
            if (expIndex > 0) yPos += SUB_SECTION_SPACING; // Space between experience entries
            addHeading(doc, `${exp.role} | ${exp.company}`, 2); // Adds HEADING_L2_AFTER_SPACING
            
            addText(doc, `${exp.period}${exp.location ? ` | ${exp.location}` : ''}`, MARGIN, {lineHeightFactor: 1.1}, false, 9);
            yPos += ITEM_BLOCK_SPACING; // Space after period/location line
            
            if (exp.responsibilities && exp.responsibilities.length > 0) {
                exp.responsibilities.forEach(resp => addBulletPoint(doc, resp));
                // addBulletPoint adds BULLET_AFTER_SPACING
            }
            if (exp.achievements && exp.achievements.length > 0) {
                 yPos += ITEM_BLOCK_SPACING; // Space before "Key Achievements" if responsibilities were present
                 addText(doc, 'Key Achievements:', MARGIN, {lineHeightFactor: LINE_HEIGHT_FACTOR}, true, 10);
                 yPos += ITEM_BLOCK_SPACING / 2; // Small space after "Key Achievements:" text
                 exp.achievements.forEach(ach => addBulletPoint(doc, ach, 7));
                 // addBulletPoint adds BULLET_AFTER_SPACING
            }
        });
    }

    // --- Education ---
    if (data.education && data.education.length > 0) {
        addHeading(doc, 'Education', 1);
        data.education.forEach((edu, eduIndex) => {
            if (eduIndex > 0) yPos += SUB_SECTION_SPACING; // Space between education entries
            addHeading(doc, edu.degree, 2); // Adds HEADING_L2_AFTER_SPACING
            
            addText(doc, edu.institution, MARGIN, {}, false, 10);
            yPos += ITEM_BLOCK_SPACING / 2; // Space after institution
            addText(doc, `${edu.period}${edu.grade ? ` | Grade: ${edu.grade}` : ''}`, MARGIN, {lineHeightFactor: 1.1}, false, 9);
        });
    }
    
    // --- Skills ---
    if (data.skills) {
        addHeading(doc, 'Skills', 1);
        const { technical, tools, soft } = data.skills;
        
        const formatSkillsToList = (skillArray: Skill[], categoryTitle: string, isFirstInSection: boolean) => {
            if (skillArray && skillArray.length > 0) {
                if (!isFirstInSection) yPos += SUB_SECTION_SPACING / 2; // Less space if not the very first skill category
                addHeading(doc, categoryTitle, 2); // Adds HEADING_L2_AFTER_SPACING
                const skillsText = skillArray.map(s => s.name).join(', ');
                addText(doc, skillsText, MARGIN);
            }
        };
        
        let isFirstSkillCategory = true;
        if (technical && technical.length > 0) {
            const techSkillsByCategory: { [key: string]: string[] } = {};
            technical.forEach(skill => {
                const category = skill.category || 'Other Technical Skills';
                if (!techSkillsByCategory[category]) {
                    techSkillsByCategory[category] = [];
                }
                techSkillsByCategory[category].push(skill.name);
            });

            for (const category in techSkillsByCategory) {
                 if (!isFirstSkillCategory) yPos += SUB_SECTION_SPACING / 2; // Space between tech skill sub-categories
                addHeading(doc, category, 2); // Adds HEADING_L2_AFTER_SPACING
                addText(doc, techSkillsByCategory[category].join(', '), MARGIN);
                isFirstSkillCategory = false;
            }
        }
        formatSkillsToList(tools, 'Tools & Technologies', isFirstSkillCategory);
        isFirstSkillCategory = isFirstSkillCategory && !(tools && tools.length > 0); // Update if tools were printed
        
        formatSkillsToList(soft, 'Soft Skills', isFirstSkillCategory);
    }

    // --- Projects ---
    if (data.projects && data.projects.length > 0) {
        addHeading(doc, 'Projects', 1);
        data.projects.forEach((proj, projIndex) => {
            if (projIndex > 0) yPos += SUB_SECTION_SPACING; // Space between project entries
            addHeading(doc, `${proj.name} (${proj.role})`, 2); // Adds HEADING_L2_AFTER_SPACING
            
            addText(doc, proj.description, MARGIN);
            yPos += ITEM_BLOCK_SPACING; // Space after description
            if (proj.highlights && proj.highlights.length > 0) {
                proj.highlights.forEach(hl => addBulletPoint(doc, hl));
                // addBulletPoint adds BULLET_AFTER_SPACING
            }
            if (proj.technologies && proj.technologies.length > 0) {
                yPos += ITEM_BLOCK_SPACING; // Space before "Technologies"
                addText(doc, `Technologies: ${proj.technologies.join(', ')}`, MARGIN + 5);
            }
        });
    }
    
    // --- Achievements (Quantitative) ---
    if (data.achievements && data.achievements.length > 0) {
        addHeading(doc, 'Key Quantifiable Achievements', 1);
        data.achievements.forEach(ach => {
            const achText = `${ach.metric}: ${ach.description}`;
             addBulletPoint(doc, achText, 0); // Indent 0 for full width bullet
             // addBulletPoint adds BULLET_AFTER_SPACING
        });
    }
    
    // --- Certifications ---
    if (data.certifications && data.certifications.length > 0) {
        addHeading(doc, 'Certifications', 1); // Adds HEADING_L1_AFTER_SPACING
        const certText = data.certifications.map(c => `${c.name}${c.issuer ? ` (${c.issuer})` : ''}`).join('; ');
        addText(doc, certText, MARGIN);
    }
    
    // --- Community Involvement ---
    if (data.communityInvolvement && data.communityInvolvement.length > 0) {
        addHeading(doc, 'Community Involvement & Awards', 1); // Adds HEADING_L1_AFTER_SPACING
        const communityText = data.communityInvolvement.map(c => `${c.name}${c.role ? ` - ${c.role}` : ''}`).join('; ');
        addText(doc, communityText, MARGIN);
    }

    // --- Custom Sections ---
     if (data.customSections && data.customSections.length > 0) {
        data.customSections.forEach(section => {
            if (section.title && section.items && section.items.length > 0) {
                addHeading(doc, section.title, 1); // Adds HEADING_L1_AFTER_SPACING
                section.items.forEach(item => {
                    if (item.key && item.value) {
                        addBulletPoint(doc, `${item.key}: ${item.value}`, 0); // Indent 0 for full width bullet
                        // addBulletPoint adds BULLET_AFTER_SPACING
                    }
                });
            }
        });
    }

    doc.save(`${data.name.replace(/\s+/g, '_')}_Resume.pdf`);
}

    