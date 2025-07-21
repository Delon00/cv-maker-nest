import { Injectable } from '@nestjs/common';
import { CvResponseDto } from './cv.dto';

@Injectable()
export class CvMapper {

    toResponseDto(entity: any): CvResponseDto {
        return {
            id: entity.id,
            cvName: entity.cvName,
            profile: entity.title ?? undefined,
            linkedIn: entity.linkedIn ?? undefined,
            website: entity.website ?? undefined,
            templateId: entity.templateId,
            lastName: entity.lastName ?? undefined,
            firstName: entity.firstName ?? undefined,
            email: entity.email ?? undefined,
            phone: entity.phone ?? undefined,
            resume: entity.resume ?? undefined,
            city: entity.city ?? undefined,
            createdAt: entity.createdAt,
            updatedAt:entity.updatedAt ?? undefined,
            educations: entity.educations?.map(e => this.mapEducation(e)) ?? [],
            experiences: entity.experiences?.map(e => this.mapExperience(e)) ?? [],
            skills: entity.skills?.map(s => this.mapSkill(s)) ?? [],
            languages: entity.languages?.map(l => this.mapLanguage(l)) ?? [],
            interests: entity.interests?.map(i => this.mapInterest(i)) ?? [],
            certifications: entity.certifications?.map(c => this.mapCertification(c)) ?? [],
        };
    }

    private mapEducation(edu: any) {
        return {
            id: edu.id,
            school: edu.school,
            location: edu.location,
            field: edu.field,
            startYear: edu.startYear,
            endYear: edu.endYear,
        };
    }

    private mapExperience(exp: any) {
        return {
        id: exp.id,
        company: exp.company,
        location: exp.location,
        jobTitle: exp.jobTitle,
        description: exp.description,
        startMonth: exp.startMonth,
        startYear: exp.startYear,
        endMonth: exp.endMonth,
        endYear: exp.endYear,
        missions: exp.missions?.map(m => ({
            id: m.id,
            description: m.description,
        })) ?? [],
        };
    }

    private mapSkill(skill: any) {
        return {
        id: skill.id,
        name: skill.name,
        };
    }

    private mapLanguage(lang: any) {
        return {
        id: lang.id,
        name: lang.name,
        level: lang.level,
        };
    }

    private mapInterest(interest: any) {
        return {
        id: interest.id,
        name_interest: interest.name_interest,
        };
    }

    private mapCertification(cert: any) {
        return {
        id: cert.id,
        title: cert.title,
        institution: cert.institution,
        date: cert.date,
        };
    }

    private mapTemplate(template: any) {
        return {
        id: template.id,
        name: template.name,
        description: template.description,
        couleur: template.couleur,
        previewUrl: template.previewUrl,
        createdAt: template.createdAt,
        updatedAt: template.updatedAt,
        };
    }
}
