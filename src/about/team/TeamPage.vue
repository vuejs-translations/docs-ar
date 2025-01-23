<script lang="ts">
const shuffleMembers = (
  members: Member[],
  pinTheFirstMember = false
): void => {
  let offset = pinTheFirstMember ? 1 : 0
  // `i` is between `1` and `length - offset`
  // `j` is between `0` and `length - offset - 1`
  // `offset + i - 1` is between `offset` and `length - 1`
  // `offset + j` is between `offset` and `length - 1`
  let i = members.length - offset
  while (i > 0) {
    const j = Math.floor(Math.random() * i)
    ;[members[offset + i - 1], members[offset + j]] = [
      members[offset + j],
      members[offset + i - 1]
    ]
    i--
  }
}
</script>

<script setup lang="ts">
import { VTLink } from '@vue/theme'
import membersCoreData from './members-core.json'
import membersEmeritiData from './members-emeriti.json'
import membersPartnerData from './members-partner.json'
import TeamHero from './TeamHero.vue'
import TeamList from './TeamList.vue'
import type { Member } from './Member'
shuffleMembers(membersCoreData as Member[], true)
shuffleMembers(membersEmeritiData as Member[])
shuffleMembers(membersPartnerData as Member[])
</script>

<template>
  <div class="TeamPage">
    <TeamHero>
      <template #title>تعرف على الفريق</template>
      <template #lead>
      تطوير فيُو ونظامه البيئي يتم بتوجيه من فريق دولي، بعض أعضائه قد اختاروا أن يتم
      <span class="nowrap">عرضهم أدناه.</span>
      </template>

      <template #action>
        <VTLink
          href="https://github.com/vuejs/governance/blob/master/Team-Charter.md"
        >
          المزيد من المعلومات عن الفِرَق
        </VTLink>
      </template>
    </TeamHero>

    <TeamList :members="membersCoreData as Member[]">
      <template #title>أعضاء الفريق الأساسي</template>
      <template #lead>
        أعضاء الفريق الأساسي هم أولئك الذين يشاركون بنشاط في صيانة مشروع أو أكثر من المشاريع الأساسية. لقد قدموا مساهمات كبيرة في نظام فيُو البيئي، ولديهم التزام طويل الأمد بنجاح المشروع ومستخدميه.
      </template>
    </TeamList>

    <TeamList :members="membersEmeritiData as Member[]">
      <template #title>أعضاء الفريق الأساسي الشرفيين</template>
      <template #lead>
        هنا نكرم بعض أعضاء الفريق الأساسي الذين لم يعودوا نشطين والذين قدموا مساهمات قيمة في الماضي.
      </template
      >
    </TeamList>

    <TeamList :members="membersPartnerData as Member[]">
      <template #title>شركاء المجتمع
    </template>
      <template #lead>
        بعض أعضاء مجتمع فيُو قد أثّروا فيه بشكل كبير لدرجة أنهم يستحقون ذكرًا خاصًا. لقد طورنا علاقة أكثر حميمية مع هؤلاء الشركاء الرئيسيين، وغالبًا ما نتعاون معهم بشأن الميزات القادمة والأخبار.
      </template>
    </TeamList>
  </div>
</template>

<style scoped>
.TeamPage {
  padding-bottom: 16px;
}

@media (min-width: 768px) {
  .TeamPage {
    padding-bottom: 96px;
  }
}

.TeamList + .TeamList {
  padding-top: 64px;
}
</style>
