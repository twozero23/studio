
"use client";
import jsPDF from 'jspdf';
import type { PortfolioData, ExperienceEntry, EducationEntry, Skill, ProjectEntry, AchievementHighlight, CustomSectionEntry, CommunityEntry, CertificationEntry } from './portfolio-data-types';

let yPos = 20; // Initial Y position
const A4_WIDTH = 210;
const A4_HEIGHT = 297;
const MARGIN = 15;
const CONTENT_WIDTH = A4_WIDTH - 2 * MARGIN;
const LINE_HEIGHT = 6; // Adjusted line height for better spacing with 10pt font
const SECTION_SPACING = 8;
const SUB_SECTION_SPACING = 4;

function checkAndAddPage(doc: jsPDF, requiredHeight: number = LINE_HEIGHT * 2) {
    if (yPos + requiredHeight > A4_HEIGHT - MARGIN) {
        doc.addPage();
        yPos = MARGIN;
    }
}

function addText(doc: jsPDF, text: string | string[], x: number, options?: any, isBold = false, fontSize?: number) {
    checkAndAddPage(doc);
    const originalFontSize = doc.getFontSize();
    const originalFont = doc.getFont();

    if (fontSize) {
        doc.setFontSize(fontSize);
    }
    if (isBold) {
        doc.setFont(originalFont.fontName, 'bold', originalFont.fontStyle);
    } else {
        doc.setFont(originalFont.fontName, 'normal', originalFont.fontStyle);
    }
    
    doc.text(text, x, yPos, options);
    
    if (isBold) {
         doc.setFont(originalFont.fontName, originalFont.fontStyle); // Reset to original style
    }
    if (fontSize) {
        doc.setFontSize(originalFontSize); // Reset font size
    }


    if (Array.isArray(text)) {
         yPos += text.length * (options?.lineHeightFactor || 0.9) * LINE_HEIGHT;
    } else {
        yPos += LINE_HEIGHT * (options?.lineHeightFactor || 0.9);
    }
}

function addHeading(doc: jsPDF, text: string, level: 1 | 2 | 3 = 1) {
    yPos += (level === 1 ? SECTION_SPACING : SUB_SECTION_SPACING) / 2;
    checkAndAddPage(doc, (level === 1 ? 12 : 10) + SUB_SECTION_SPACING); // Estimate height for heading

    const fontSize = level === 1 ? 14 : (level === 2 ? 11 : 10);
    addText(doc, text, MARGIN, {}, true, fontSize);
    
    if (level === 1) {
        checkAndAddPage(doc, 1); // For the line
        doc.setLineWidth(0.3);
        doc.line(MARGIN, yPos - LINE_HEIGHT * 0.5, MARGIN + CONTENT_WIDTH, yPos - LINE_HEIGHT * 0.5);
    }
    yPos += (level === 1 ? SECTION_SPACING : SUB_SECTION_SPACING) / 2;
}

function addBulletPoint(doc: jsPDF, text: string, indent = 5) {
    const bulletText = `• ${text}`;
    const lines = doc.splitTextToSize(bulletText, CONTENT_WIDTH - indent);
    addText(doc, lines, MARGIN + indent, { lineHeightFactor: 1 });
}


export function generateResumePdf(data: PortfolioData) {
    const doc = new jsPDF('p', 'mm', 'a4');
    yPos = MARGIN; 

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);

    // --- Header ---
    addText(doc, data.name, A4_WIDTH / 2, { align: 'center' }, true, 18);
    addText(doc, data.title, A4_WIDTH / 2, { align: 'center' }, false, 11);
    yPos += SUB_SECTION_SPACING / 2;

    let contactParts: string[] = [];
    if (data.contact.email) contactParts.push(data.contact.email);
    if (data.contact.phone) contactParts.push(data.contact.phone);
    if (data.contact.linkedin) contactParts.push(data.contact.linkedin.replace(/^(https?:\/\/)?(www\.)?/, ''));
    if (data.contact.github) contactParts.push(data.contact.github.replace(/^(https?:\/\/)?(www\.)?/, ''));
    
    const contactLine = contactParts.join(' | ');
    addText(doc, contactLine, A4_WIDTH / 2, { align: 'center' }, false, 9);
    yPos += SECTION_SPACING;

    // --- Summary ---
    if (data.summary) {
        addHeading(doc, 'Summary', 1);
        const summaryLines = doc.splitTextToSize(data.summary, CONTENT_WIDTH);
        addText(doc, summaryLines, MARGIN);
    }

    // --- Experience ---
    if (data.experience && data.experience.length > 0) {
        addHeading(doc, 'Experience', 1);
        data.experience.forEach(exp => {
            addHeading(doc, `${exp.role} | ${exp.company}`, 2);
            addText(doc, `${exp.period}${exp.location ? ` | ${exp.location}` : ''}`, MARGIN, {}, false, 9);
            
            if (exp.responsibilities && exp.responsibilities.length > 0) {
                yPos += SUB_SECTION_SPACING / 3;
                exp.responsibilities.forEach(resp => addBulletPoint(doc, resp));
            }
            if (exp.achievements && exp.achievements.length > 0) {
                 yPos += SUB_SECTION_SPACING / 2;
                 addText(doc, 'Key Achievements:', MARGIN, {lineHeightFactor: 1.2}, true, 10);
                 exp.achievements.forEach(ach => addBulletPoint(doc, ach, 7));
            }
            yPos += SUB_SECTION_SPACING;
        });
    }

    // --- Education ---
    if (data.education && data.education.length > 0) {
        addHeading(doc, 'Education', 1);
        data.education.forEach(edu => {
            addHeading(doc, edu.degree, 2);
            addText(doc, edu.institution, MARGIN, {}, false, 10);
            addText(doc, `${edu.period}${edu.grade ? ` | Grade: ${edu.grade}` : ''}`, MARGIN, {}, false, 9);
            yPos += SUB_SECTION_SPACING;
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
                const skillLines = doc.splitTextToSize(skillsText, CONTENT_WIDTH);
                addText(doc, skillLines, MARGIN);
                yPos += SUB_SECTION_SPACING /2;
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

            for (const category in techSkillsByCategory) {
                addHeading(doc, category, 2);
                const skillLines = doc.splitTextToSize(techSkillsByCategory[category].join(', '), CONTENT_WIDTH);
                addText(doc, skillLines, MARGIN);
                yPos += SUB_SECTION_SPACING /2;
            }
        }
        formatSkillsToList(tools, 'Tools & Technologies');
        formatSkillsToList(soft, 'Soft Skills');
    }

    // --- Projects ---
    if (data.projects && data.projects.length > 0) {
        addHeading(doc, 'Projects', 1);
        data.projects.forEach(proj => {
            addHeading(doc, `${proj.name} (${proj.role})`, 2);
            const descLines = doc.splitTextToSize(proj.description, CONTENT_WIDTH);
            addText(doc, descLines, MARGIN);
            if (proj.highlights && proj.highlights.length > 0) {
                 yPos += SUB_SECTION_SPACING / 2;
                proj.highlights.forEach(hl => addBulletPoint(doc, hl));
            }
            if (proj.technologies && proj.technologies.length > 0) {
                yPos += SUB_SECTION_SPACING / 2;
                const techLines = doc.splitTextToSize(`Technologies: ${proj.technologies.join(', ')}`, CONTENT_WIDTH);
                addText(doc, techLines, MARGIN + 5);
            }
            yPos += SUB_SECTION_SPACING;
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
        const certLines = doc.splitTextToSize(certText, CONTENT_WIDTH);
        addText(doc, certLines, MARGIN);
    }
    
    // --- Community Involvement ---
    if (data.communityInvolvement && data.communityInvolvement.length > 0) {
        addHeading(doc, 'Community Involvement & Awards', 1);
        const communityText = data.communityInvolvement.map(c => `${c.name}${c.role ? ` - ${c.role}` : ''}`).join('; ');
        const communityLines = doc.splitTextToSize(communityText, CONTENT_WIDTH);
        addText(doc, communityLines, MARGIN);
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
                yPos += SUB_SECTION_SPACING;
            }
        });
    }

    doc.save(`${data.name.replace(/\s+/g, '_')}_Resume.pdf`);
}
