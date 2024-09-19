import CrewMember from '../models/CrewMember';
import { ICrewMember } from '../models/CrewMember';

// Existing function to create crew members
export const createCrewMembers = async (crewMembers: ICrewMember[]) => {
    try {
        await CrewMember.insertMany(crewMembers);
        return { success: true, message: 'Crew members stored successfully' };
    } catch (error) {
        throw new Error('Failed to store crew members');
    }
};

// Existing function to get crew members by fullName
export const getCrewMembersByFullName = async (fullName: string) => {
    try {
        const crewMembers = await CrewMember.find({ fullName }, 'name email relation');
        return crewMembers;
    } catch (error) {
        throw new Error('Failed to retrieve crew members');
    }
};

// New function to get additional crew members based on name and relation
export const getAdditionalCrewMembers = async (fullName: string) => {
    try {
        // Find crew member with the specified fullName
        const crewMember = await CrewMember.findOne({ fullName });

        if (!crewMember) {
            throw new Error('Crew member not found');
        }

        // Retrieve additional crew members with matching name and relation but different fullName
        const additionalMembers = await CrewMember.find({
            name: crewMember.name,
            relation: crewMember.relation,
            fullName: { $ne: fullName } // Exclude the original member
        });

        return additionalMembers;
    } catch (error) {
        throw new Error('Failed to retrieve additional crew members');
    }
};
