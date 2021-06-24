import { TeamMemberProfile } from '../classes/team';

let Owner: TeamMemberProfile = {
    name: 'Tai Loughman',
    phone: '740 299 -4147',
    email: 'hello@tai-dye-studios.com',
    designation: ['Owner', 'Designer']
}

export const TEAM: TeamMemberProfile[] = [
    {
        name: 'Tai Loughman',
        phone: '740 299 - 4147',
        email: 'hello@tai-dye-studios.com',
        imgURL: 'assets/images/team/tai-loughman.jpg',
        socialLinks: [
            { name: 'facebook', url: 'https://facebook.com/taidyestudios', icon: 'fa-facebook' }
        ],
        designation: ['Owner', 'Designer'],
        bio: 'Owner of Tai-Dye Studios, Tai is behind all of the designs you see on everything we sell.'
    },
    {
        name: 'Jimi Flynn',
        phone: '220 465 - 0947',
        email: 'jimi@suremarketingsolutions',
        imgURL: 'assets/images/team/jimi-flynn.jpg',
        socialLinks: [
            { name: 'facebook', url: 'https://facebook.com/suremarketingsolutions', icon: 'fa-facebook' }
        ],
        designation: ['Web Dev & Design', 'Marketing'],
        bio: 'Lead developer and web designer. Jimi plays a huge role in all of our marketing.'
    },
    {
        name: 'Katie Loughman',
        email: 'kloughman13@gmail.com',
        imgURL: 'assets/images/team/katie-loughman.jpg',
        designation: ['Designer'],
        bio: 'Creative and crucial in helping create a lot of our custom designs.'
    }
]