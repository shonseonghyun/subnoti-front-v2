import BaseCard from "src/components/BaseCard/BaseCard";
import { useFetchGetMember } from "src/hooks/query/useFetchGetMember";
import { useAuthStore } from "src/zustand/AuthUserInfo";
import ProfileUpdateButton from "../button/ProfileUpdateButton";
import ProfileForm from "../profile/ProfileForm";
import SubscriptionForm from "../subscription/SubscriptionForm";


const FbDefaultForm = () => {
  const authUserInfo = useAuthStore((state) => state.authUserInfo);
  const getMember = useFetchGetMember(authUserInfo.memberNo);
  const formId = "profile-form"

  return (
    <BaseCard title="My Profile">
        {/* 프로필 섹션 */}
        <ProfileForm formId={formId} profile={getMember.data?.data} />

        {/* 구독권 섹션 */}
        <SubscriptionForm subscription={getMember.data?.data?.subscriptionInfo} />  
        
        {/* 수정 버튼 */}
        <ProfileUpdateButton formId={formId} />
    </BaseCard>
  );
};

export default FbDefaultForm;
