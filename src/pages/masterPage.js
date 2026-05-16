import { currentMember } from 'wix-members';

function hideAdminTab() {
    const menu = $w('#horizontalMenu1');
    const adminLabels = ['admin review', 'admin add challenge'];
    menu.menuItems = menu.menuItems.filter(item => !adminLabels.includes(item.label.toLowerCase().trim()));
}

$w.onReady(async function () {
    const member = await currentMember.getMember().catch(() => null);
    if (!member) {
        hideAdminTab();
        return;
    }

    const roles = await currentMember.getRoles().catch(() => []);
    const isAdmin = roles.some(r => r.title === 'Admin' || r.title === 'Moderator');
    if (!isAdmin) {
        hideAdminTab();
    }
});
