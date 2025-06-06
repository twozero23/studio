
"use client";
import jsPDF from 'jspdf';
import type { PortfolioData, ExperienceEntry, EducationEntry, Skill, ProjectEntry, AchievementHighlight, CustomSectionEntry, CommunityEntry, CertificationEntry } from './portfolio-data-types';

let yPos = 20; // Initial Y position
const A4_WIDTH = 210;
const A4_HEIGHT = 297;
const MARGIN = 15;
const CONTENT_WIDTH = A4_WIDTH - 2 * MARGIN;
const SECTION_SPACING = 7; 
const SUB_SECTION_SPACING = 3; 
const ITEM_SPACING = 1.5; 

function checkAndAddPage(doc: jsPDF, requiredHeight: number = 5) { 
    if (yPos + requiredHeight > A4_HEIGHT - MARGIN) {
        doc.addPage();
        yPos = MARGIN;
    }
}

function addText(doc: jsPDF, text: string | string[], x: number, options?: any, isBold = false, fontSize?: number) {
    const originalDocFontName = doc.getFont().fontName;
    const originalDocFontStyle = doc.getFont().fontStyle;
    const originalDocFontSize = doc.getFontSize();

    let targetStyle = originalDocFontStyle;
    if (isBold) {
        targetStyle = (originalDocFontStyle === 'italic' || originalDocFontStyle === 'bolditalic') ? 'bolditalic' : 'bold';
    } else {
        if (originalDocFontStyle === 'bold') targetStyle = 'normal';
        else if (originalDocFontStyle === 'bolditalic') targetStyle = 'italic';
    }
    doc.setFont(originalDocFontName, targetStyle);

    if (fontSize) {
        doc.setFontSize(fontSize);
    }

    const textLines = Array.isArray(text) ? text : doc.splitTextToSize(text.toString(), options?.maxWidth || CONTENT_WIDTH);
    
    const dims = doc.getTextDimensions(textLines.join('\n')); 
    const actualBlockHeight = dims.h;

    checkAndAddPage(doc, actualBlockHeight); 

    doc.text(textLines, x, yPos, options);

    doc.setFont(originalDocFontName, originalDocFontStyle);
    doc.setFontSize(originalDocFontSize);

    yPos += actualBlockHeight;
}


function addHeading(doc: jsPDF, text: string, level: 1 | 2 | 3 = 1) {
    yPos += (level === 1 ? SECTION_SPACING : SUB_SECTION_SPACING); 

    const headingFontSize = level === 1 ? 14 : (level === 2 ? 11 : 10);
    
    const originalDocFontName = doc.getFont().fontName;
    const originalDocFontStyle = doc.getFont().fontStyle;
    const originalDocFontSize = doc.getFontSize();

    doc.setFont(originalDocFontName, 'bold');
    doc.setFontSize(headingFontSize);
    const estHeadingHeight = doc.getTextDimensions(text).h;

    doc.setFont(originalDocFontName, originalDocFontStyle);
    doc.setFontSize(originalDocFontSize);

    checkAndAddPage(doc, estHeadingHeight); 

    addText(doc, text, MARGIN, {}, true, headingFontSize); 

    // Removed underline drawing logic for level 1 headings
    if (level === 1) {
        yPos += 1.5; // Padding after level 1 heading
    } else {
        yPos += ITEM_SPACING; // Padding after L2/L3 headings
    }
}

function addBulletPoint(doc: jsPDF, text: string, indent = 5) {
    const bulletText = `• ${text}`;
    addText(doc, bulletText, MARGIN + indent, { maxWidth: CONTENT_WIDTH - indent, lineHeightFactor: 1.1 });
    yPos += ITEM_SPACING / 2; 
}


export function generateResumePdf(data: PortfolioData) {
    const doc = new jsPDF('p', 'mm', 'a4');
    yPos = MARGIN; 

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);

    // --- Header ---
    addText(doc, data.name, A4_WIDTH / 2, { align: 'center' }, true, 18);
    yPos += ITEM_SPACING;
    addText(doc, data.title, A4_WIDTH / 2, { align: 'center' }, false, 11);
    yPos += ITEM_SPACING / 2;

    let contactParts: string[] = [];
    if (data.contact.email) contactParts.push(data.contact.email);
    if (data.contact.phone) contactParts.push(data.contact.phone);
    if (data.contact.linkedin) contactParts.push(data.contact.linkedin.replace(/^(https?:\/\/)?(www\.)?/, ''));
    if (data.contact.github) contactParts.push(data.contact.github.replace(/^(https?:\/\/)?(www\.)?/, ''));
    
    const contactLine = contactParts.join(' | ');
    addText(doc, contactLine, A4_WIDTH / 2, { align: 'center' }, false, 9);

    // --- Summary ---
    if (data.summary) {
        addHeading(doc, 'Summary', 1);
        addText(doc, data.summary, MARGIN);
        yPos += ITEM_SPACING; 
    }

    // --- Experience ---
    if (data.experience && data.experience.length > 0) {
        addHeading(doc, 'Experience', 1);
        data.experience.forEach((exp, expIndex) => {
            if (expIndex > 0) yPos += SUB_SECTION_SPACING; 
            addHeading(doc, `${exp.role} | ${exp.company}`, 2);
            addText(doc, `${exp.period}${exp.location ? ` | ${exp.location}` : ''}`, MARGIN, {}, false, 9);
            yPos += ITEM_SPACING; 
            
            if (exp.responsibilities && exp.responsibilities.length > 0) {
                exp.responsibilities.forEach(resp => addBulletPoint(doc, resp));
            }
            if (exp.achievements && exp.achievements.length > 0) {
                 yPos += SUB_SECTION_SPACING / 2;
                 addText(doc, 'Key Achievements:', MARGIN, {lineHeightFactor: 1.1}, true, 10);
                 yPos += ITEM_SPACING;
                 exp.achievements.forEach(ach => addBulletPoint(doc, ach, 7));
            }
        });
    }

    // --- Education ---
    if (data.education && data.education.length > 0) {
        addHeading(doc, 'Education', 1);
        data.education.forEach((edu, eduIndex) => {
            if (eduIndex > 0) yPos += SUB_SECTION_SPACING;
            addHeading(doc, edu.degree, 2);
            addText(doc, edu.institution, MARGIN, {}, false, 10);
            yPos += ITEM_SPACING / 2;
            addText(doc, `${edu.period}${edu.grade ? ` | Grade: ${edu.grade}` : ''}`, MARGIN, {}, false, 9);
        });
    }
    
    // --- Skills ---
    if (data.skills) {
        addHeading(doc, 'Skills', 1);
        const { technical, tools, soft } = data.skills;
        
        const formatSkillsToList = (skillArray: Skill[], categoryTitle: string) => {
            if (skillArray && skillArray.length > 0) {
                addHeading(doc, categoryTitle, 2);
                const skillsText = skillArray.map(s => s.name).join(', ');
                addText(doc, skillsText, MARGIN);
            }
        };
        
        if (technical && technical.length > 0) {
            const techSkillsByCategory: { [key: string]: string[] } = {};
            technical.forEach(skill => {
                const category = skill.category || 'Other Technical Skills';
                if (!techSkillsByCategory[category]) {
                    techSkillsByCategory[category] = [];
                }
                techSkillsByCategory[category].push(skill.name);
            });

            let firstCategory = true;
            for (const category in techSkillsByCategory) {
                if (!firstCategory) yPos += SUB_SECTION_SPACING / 2;
                addHeading(doc, category, 2);
                addText(doc, techSkillsByCategory[category].join(', '), MARGIN);
                firstCategory = false;
            }
        }
        formatSkillsToList(tools, 'Tools & Technologies');
        formatSkillsToList(soft, 'Soft Skills');
    }

    // --- Projects ---
    if (data.projects && data.projects.length > 0) {
        addHeading(doc, 'Projects', 1);
        data.projects.forEach((proj, projIndex) => {
            if (projIndex > 0) yPos += SUB_SECTION_SPACING;
            addHeading(doc, `${proj.name} (${proj.role})`, 2);
            addText(doc, proj.description, MARGIN);
            yPos += ITEM_SPACING;
            if (proj.highlights && proj.highlights.length > 0) {
                proj.highlights.forEach(hl => addBulletPoint(doc, hl));
            }
            if (proj.technologies && proj.technologies.length > 0) {
                yPos += ITEM_SPACING;
                addText(doc, `Technologies: ${proj.technologies.join(', ')}`, MARGIN + 5); 
            }
        });
    }
    
    // --- Achievements (Quantitative) ---
    if (data.achievements && data.achievements.length > 0) {
        addHeading(doc, 'Key Quantifiable Achievements', 1);
        data.achievements.forEach(ach => {
            const achText = `${ach.metric}: ${ach.description}`;
             addBulletPoint(doc, achText, 0);
        });
    }
    
    // --- Certifications ---
    if (data.certifications && data.certifications.length > 0) {
        addHeading(doc, 'Certifications', 1);
        const certText = data.certifications.map(c => `${c.name}${c.issuer ? ` (${c.issuer})` : ''}`).join('; ');
        addText(doc, certText, MARGIN);
    }
    
    // --- Community Involvement ---
    if (data.communityInvolvement && data.communityInvolvement.length > 0) {
        addHeading(doc, 'Community Involvement & Awards', 1);
        const communityText = data.communityInvolvement.map(c => `${c.name}${c.role ? ` - ${c.role}` : ''}`).join('; ');
        addText(doc, communityText, MARGIN);
    }

    // --- Custom Sections ---
     if (data.customSections && data.customSections.length > 0) {
        data.customSections.forEach(section => {
            if (section.title && section.items && section.items.length > 0) {
                addHeading(doc, section.title, 1);
                section.items.forEach(item => {
                    if (item.key && item.value) {
                        addBulletPoint(doc, `${item.key}: ${item.value}`, 0);
                    }
                });
            }
        });
    }

    doc.save(`${data.name.replace(/\s+/g, '_')}_Resume.pdf`);
}
