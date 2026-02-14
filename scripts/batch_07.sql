INSERT INTO ndis_support_items (
        support_item_number, support_item_name, registration_group_number, registration_group_name,
        support_category_number, support_category_name, unit, quote_required, support_purpose,
        price_act, price_nsw, price_nt, price_qld, price_sa, price_tas, price_vic, price_wa, price_remote, price_very_remote,
        non_face_to_face, provider_travel, short_notice_cancellations, ndia_requested_reports, irregular_sil_supports
    )
    VALUES
    (
            '15_622_0128_1_3',
            'Assessment Recommendation Therapy or Training - Speech Pathologist',
            128,
            'Therapeutic Supports',
            15,
            'Improved Daily Living Skills',
            'H',
            FALSE,
            'Capacity Building',
            NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
            FALSE, FALSE, FALSE, FALSE, FALSE
        ),(
            '15_625_0118_1_3',
            'Early Childhood Intervention Professional - Early Childhood Teacher or Educator',
            118,
            'Early Intervention Supports For Early Childhood',
            15,
            'Improved Daily Living Skills',
            'H',
            FALSE,
            'Capacity Building',
            NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
            FALSE, FALSE, FALSE, FALSE, FALSE
        ),(
            '15_799_0103_6_3',
            'Provider travel - non-labour costs',
            103,
            'Assistive Products For Personal Care And Safety',
            15,
            'Improved Daily Living Skills',
            'E',
            FALSE,
            'Capacity Building',
            NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
            FALSE, FALSE, FALSE, FALSE, FALSE
        ),(
            '15_799_0106_1_3',
            'Provider travel - non-labour costs',
            106,
            'Assistance In Coordinating Or Managing Life Stages, Transitions And Supports',
            15,
            'Improved Daily Living Skills',
            'E',
            FALSE,
            'Capacity Building',
            NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
            FALSE, FALSE, FALSE, FALSE, FALSE
        ),(
            '15_799_0114_1_3',
            'Provider travel - non-labour costs',
            114,
            'Community Nursing Care',
            15,
            'Improved Daily Living Skills',
            'E',
            FALSE,
            'Capacity Building',
            NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
            FALSE, FALSE, FALSE, FALSE, FALSE
        ),(
            '15_799_0117_1_3',
            'Provider travel - non-labour costs',
            117,
            'Development Of Daily Living And Life Skills',
            15,
            'Improved Daily Living Skills',
            'E',
            FALSE,
            'Capacity Building',
            NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
            FALSE, FALSE, FALSE, FALSE, FALSE
        ),(
            '15_799_0118_1_3',
            'Provider travel - non-labour costs',
            118,
            'Early Intervention Supports For Early Childhood',
            15,
            'Improved Daily Living Skills',
            'E',
            FALSE,
            'Capacity Building',
            NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
            FALSE, FALSE, FALSE, FALSE, FALSE
        ),(
            '15_799_0119_1_3',
            'Provider travel - non-labour costs',
            119,
            'Specialised Hearing Services',
            15,
            'Improved Daily Living Skills',
            'E',
            FALSE,
            'Capacity Building',
            NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
            FALSE, FALSE, FALSE, FALSE, FALSE
        ),(
            '15_799_0126_1_3',
            'Provider travel - non-labour costs',
            126,
            'Exercise Physiology & Personal Well-being Activities',
            15,
            'Improved Daily Living Skills',
            'E',
            FALSE,
            'Capacity Building',
            NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
            FALSE, FALSE, FALSE, FALSE, FALSE
        ),(
            '15_799_0128_1_3',
            'Provider travel - non-labour costs',
            128,
            'Therapeutic Supports',
            15,
            'Improved Daily Living Skills',
            'E',
            FALSE,
            'Capacity Building',
            NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
            FALSE, FALSE, FALSE, FALSE, FALSE
        ),(
            '15_799_0134_1_3',
            'Provider travel - non-labour costs',
            134,
            'Hearing Services',
            15,
            'Improved Daily Living Skills',
            'E',
            FALSE,
            'Capacity Building',
            NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
            FALSE, FALSE, FALSE, FALSE, FALSE
        ),(
            '15_799_0135_1_3',
            'Provider travel - non-labour costs',
            135,
            'Customised Prosthetics (includes Orthotics)',
            15,
            'Improved Daily Living Skills',
            'E',
            FALSE,
            'Capacity Building',
            NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
            FALSE, FALSE, FALSE, FALSE, FALSE
        ),(
            'Bereavement',
            'Plan Management - Bereavement Payment',
            127,
            'Management of Funding for Supports',
            14,
            'Improved Life Choices',
            'MON',
            FALSE,
            'Capacity Building',
            NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
            FALSE, FALSE, FALSE, FALSE, FALSE
        )
    ON CONFLICT (support_item_number) DO UPDATE SET
        support_item_name = EXCLUDED.support_item_name,
        support_category_number = EXCLUDED.support_category_number,
        support_purpose = EXCLUDED.support_purpose;