import { currentMember } from 'wix-members';

$w.onReady(async function () {
    const member = await currentMember.getMember().catch(() => null);
    if (!member) {
        $w('#adminReviewTab').hide();
        return;
    }

    const roles = await currentMember.getRoles().catch(() => []);
    const isAdmin = roles.some(r => r.title === 'Admin' || r.title === 'Moderator');
    if (!isAdmin) {
        $w('#adminReviewTab').hide();
    }
});
