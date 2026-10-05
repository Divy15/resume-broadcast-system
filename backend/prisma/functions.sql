=================== Postgres sql function ====================

==================
Function 1
==================

-- FUNCTION: public.app_pass_config_get_app_password_config(integer)

-- DROP FUNCTION IF EXISTS public.app_pass_config_get_app_password_config(integer);

CREATE OR REPLACE FUNCTION public.app_pass_config_get_app_password_config(
	in_userid integer)
    RETURNS TABLE(userid integer, app_email character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL SAFE 
    ROWS 1000

AS $BODY$
BEGIN

-- select * from get_app_password_config(1)

RETURN QUERY(
	select u.id as userid, u.app_email
	from user_master u
	where u.id = in_userid
);

END;
$BODY$;

ALTER FUNCTION public.app_pass_config_get_app_password_config(integer)
    OWNER TO postgres;


======================
Function 2
======================

-- FUNCTION: public.app_pass_config_store_user_application_password(integer, character varying, character varying)

-- DROP FUNCTION IF EXISTS public.app_pass_config_store_user_application_password(integer, character varying, character varying);

CREATE OR REPLACE FUNCTION public.app_pass_config_store_user_application_password(
	in_userid integer,
	in_app_email character varying,
	in_app_pass character varying)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN

update user_master 
set app_email = in_app_email,
app_password = in_app_pass
where id = in_userid;

END;
$BODY$;

ALTER FUNCTION public.app_pass_config_store_user_application_password(integer, character varying, character varying)
    OWNER TO postgres;

=========================
Function 3
==========================

-- FUNCTION: public.company_registration_delete_company_info(integer, integer)

-- DROP FUNCTION IF EXISTS public.company_registration_delete_company_info(integer, integer);

CREATE OR REPLACE FUNCTION public.company_registration_delete_company_info(
	in_userid integer,
	in_id integer)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL SAFE 
AS $BODY$
BEGIN

-- select * from company_info
-- select * from company_registration_delete_company_info(1,1)

	DELETE FROM company_info
	WHERE userid = in_userid AND id = in_id;

END;
$BODY$;

ALTER FUNCTION public.company_registration_delete_company_info(integer, integer)
    OWNER TO postgres;

=========================
Function 4
=========================

-- FUNCTION: public.company_registration_get_company_count(integer)

-- DROP FUNCTION IF EXISTS public.company_registration_get_company_count(integer);

CREATE OR REPLACE FUNCTION public.company_registration_get_company_count(
	in_userid integer)
    RETURNS TABLE(total_count bigint) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL SAFE 
    ROWS 1000

AS $BODY$
BEGIN

-- select * from company_registration_get_company_count()

RETURN QUERY
	SELECT count(*) AS total_count
	FROM company_info
	WHERE userid = in_userid;

END;
$BODY$;

ALTER FUNCTION public.company_registration_get_company_count(integer)
    OWNER TO postgres;

============================
Function 5
============================

-- FUNCTION: public.company_registration_get_company_info(integer, integer)

-- DROP FUNCTION IF EXISTS public.company_registration_get_company_info(integer, integer);

CREATE OR REPLACE FUNCTION public.company_registration_get_company_info(
	in_userid integer,
	in_id integer)
    RETURNS TABLE(id integer, name character varying, website character varying, linkedin character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL SAFE 
    ROWS 1000

AS $BODY$
BEGIN

-- select * from company_registration_get_company_info(1,1)

RETURN QUERY
	SELECT c.id, c.name, c.website, c.linkedin
	FROM company_info c
	WHERE c.userid = in_userid AND c.id = in_id;

END;
$BODY$;

ALTER FUNCTION public.company_registration_get_company_info(integer, integer)
    OWNER TO postgres;

====================
Function 6
====================

-- FUNCTION: public.company_registration_get_company_list(integer)

-- DROP FUNCTION IF EXISTS public.company_registration_get_company_list(integer);

CREATE OR REPLACE FUNCTION public.company_registration_get_company_list(
	in_userid integer)
    RETURNS TABLE(id integer, name character varying, website character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL SAFE 
    ROWS 1000

AS $BODY$
BEGIN

-- select * from company_registration_get_company_list()

RETURN QUERY
	SELECT c.id, c.name, c.website
	FROM company_info c
	WHERE c.userid = in_userid
	ORDER BY c.created_at;

END;
$BODY$;

ALTER FUNCTION public.company_registration_get_company_list(integer)
    OWNER TO postgres;

=========================
Function 7
=========================

-- FUNCTION: public.company_registration_get_filter_company_list(character varying, integer)

-- DROP FUNCTION IF EXISTS public.company_registration_get_filter_company_list(character varying, integer);

CREATE OR REPLACE FUNCTION public.company_registration_get_filter_company_list(
	in_company_name character varying,
	in_userid integer)
    RETURNS TABLE(id integer, name character varying, website character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL SAFE 
    ROWS 1000

AS $BODY$
BEGIN

-- select * from company_registration_get_filter_company_list('a')

RETURN QUERY
	SELECT c.id, c.name, c.website
	FROM company_info c
	WHERE c.name ILIKE quote_literal('%' || in_company_name || '%') AND
	c.userid = in_userid;

END;
$BODY$;

ALTER FUNCTION public.company_registration_get_filter_company_list(character varying, integer)
    OWNER TO postgres;

========================
Function 8
========================

-- FUNCTION: public.company_registration_store_company_details(integer, character varying, character varying, character varying)

-- DROP FUNCTION IF EXISTS public.company_registration_store_company_details(integer, character varying, character varying, character varying);

CREATE OR REPLACE FUNCTION public.company_registration_store_company_details(
	in_userid integer,
	in_companyname character varying,
	in_website character varying,
	in_linkedin character varying)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN

-- select * from company_info

-- select * from company_registration_store_company_details(1, 'D', 'http://d.com', 'd.com/linkedin')

INSERT INTO company_info(userid, name, website, linkedin)
values(in_userid, in_companyname, in_website, in_linkedin);

END;
$BODY$;

ALTER FUNCTION public.company_registration_store_company_details(integer, character varying, character varying, character varying)
    OWNER TO postgres;

=======================
Function 9
=======================

-- FUNCTION: public.company_registration_update_company_details(integer, integer, character varying, character varying, character varying)

-- DROP FUNCTION IF EXISTS public.company_registration_update_company_details(integer, integer, character varying, character varying, character varying);

CREATE OR REPLACE FUNCTION public.company_registration_update_company_details(
	in_userid integer,
	in_id integer,
	in_companyname character varying,
	in_website character varying,
	in_linkedin character varying)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN

-- select * from company_info

-- select * from company_registration_update_company_details(1, 1, 'D1', 'http://d.com', 'd.com/linkedin')

UPDATE company_info
SET name = in_companyname,
website = in_website,
linkedin = in_linkedin
WHERE userid = in_userid AND id = in_id;

END;
$BODY$;

ALTER FUNCTION public.company_registration_update_company_details(integer, integer, character varying, character varying, character varying)
    OWNER TO postgres;

========================
Function 10
========================

-- FUNCTION: public.dashboard_get_company_registrations_bar_chart(integer, integer, integer, text)

-- DROP FUNCTION IF EXISTS public.dashboard_get_company_registrations_bar_chart(integer, integer, integer, text);

CREATE OR REPLACE FUNCTION public.dashboard_get_company_registrations_bar_chart(
	p_user_id integer,
	p_month integer,
	p_year integer,
	p_timezone text DEFAULT 'UTC'::text)
    RETURNS TABLE(registration_date date, total_count bigint) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
    RETURN QUERY
    WITH date_series AS (
        SELECT generate_series(
            make_date(p_year, p_month, 1),
            (make_date(p_year, p_month, 1) + interval '1 month' - interval '1 day')::date,
            interval '1 day'
        )::date AS d_date
    )
    SELECT 
        ds.d_date,
        -- Correct logic: Count how many UNIQUE company names appear on this date
        COUNT(DISTINCT h.company_name)::BIGINT AS total_count 
    FROM date_series ds
    LEFT JOIN hr_info h ON 
        ds.d_date = (h.created_at AT TIME ZONE 'UTC' AT TIME ZONE p_timezone)::date
        AND h.user_id = p_user_id
    GROUP BY ds.d_date  -- Only group by date to keep 1 row per day
    ORDER BY ds.d_date;
END;
$BODY$;

ALTER FUNCTION public.dashboard_get_company_registrations_bar_chart(integer, integer, integer, text)
    OWNER TO postgres;

======================
Function 11
======================

-- FUNCTION: public.dashboard_get_hr_registrations_bar_chart_as_per_user(integer, integer, integer, text)

-- DROP FUNCTION IF EXISTS public.dashboard_get_hr_registrations_bar_chart_as_per_user(integer, integer, integer, text);

CREATE OR REPLACE FUNCTION public.dashboard_get_hr_registrations_bar_chart_as_per_user(
	p_user_id integer,
	p_month integer,
	p_year integer,
	p_timezone text DEFAULT 'UTC'::text)
    RETURNS TABLE(registration_date date, total_count bigint) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
    RETURN QUERY
    WITH date_series AS (
        SELECT generate_series(
            make_date(p_year, p_month, 1),
            (make_date(p_year, p_month, 1) + interval '1 month' - interval '1 day')::date,
            interval '1 day'
        )::date AS d_date
    )
    SELECT 
        ds.d_date,
        COUNT(h.id) AS total_count -- Count the primary key/ID of hr_info
    FROM date_series ds
    LEFT JOIN hr_info h ON 
        ds.d_date = (h.created_at AT TIME ZONE 'UTC' AT TIME ZONE p_timezone)::date
        AND h.user_id = p_user_id -- CRITICAL: Filter by the user here
    GROUP BY ds.d_date
    ORDER BY ds.d_date;
END;
$BODY$;

ALTER FUNCTION public.dashboard_get_hr_registrations_bar_chart_as_per_user(integer, integer, integer, text)
    OWNER TO postgres;

==================
Function 12
==================

-- FUNCTION: public.dashboard_status_counter_card(integer)

-- DROP FUNCTION IF EXISTS public.dashboard_status_counter_card(integer);

CREATE OR REPLACE FUNCTION public.dashboard_status_counter_card(
	in_userid integer)
    RETURNS TABLE(total_hr bigint, total_company bigint, total_email_send bigint) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN

-- For testing
-- select * from dashboard_status_counter_card(1)
    RETURN QUERY
    SELECT
        COUNT(hr_name)::bigint                   AS total_hr,
        COUNT(DISTINCT company_name)::bigint     AS total_company,
        ( 
		    SELECT COALESCE(COUNT(*), 0) 
			FROM application_history
			where campaign_id IN
		    (
            SELECT campaign_id
            FROM email_campaigns
            WHERE user_id = in_userid
              AND EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM NOW())
              AND EXTRACT(YEAR  FROM created_at) = EXTRACT(YEAR  FROM NOW())
			 )
        )                                        AS total_email_send
    FROM hr_info
    WHERE user_id = in_userid;
END;
$BODY$;

ALTER FUNCTION public.dashboard_status_counter_card(integer)
    OWNER TO postgres;

===================
Function 13
===================

-- FUNCTION: public.email_campaign_complete_email_campaign_job(integer)

-- DROP FUNCTION IF EXISTS public.email_campaign_complete_email_campaign_job(integer);

CREATE OR REPLACE FUNCTION public.email_campaign_complete_email_campaign_job(
	in_campaignid integer)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
DECLARE
    has_incomplete BOOLEAN;
BEGIN

    -- Check if any row is not completed
    SELECT EXISTS (
        SELECT 1 FROM application_history
        WHERE campaign_id = in_campaignid
          AND send_status <> 'completed'
    ) INTO has_incomplete;

    UPDATE email_campaigns
    SET status = CASE WHEN has_incomplete THEN 'ERROR' ELSE 'COMPLETED' END
    WHERE campaign_id = in_campaignid;

END;
$BODY$;

ALTER FUNCTION public.email_campaign_complete_email_campaign_job(integer)
    OWNER TO postgres;

====================
Function 14
====================

-- FUNCTION: public.email_campaign_get_hr_list(integer)

-- DROP FUNCTION IF EXISTS public.email_campaign_get_hr_list(integer);

CREATE OR REPLACE FUNCTION public.email_campaign_get_hr_list(
	in_campaign_id integer)
    RETURNS TABLE(hr_id integer, company character varying, hr_name character varying, email character varying, status character varying, created_at timestamp without time zone, send_at timestamp without time zone) 
    LANGUAGE 'sql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
SELECT
    hi.id AS hr_id,
    hi.company_name,
	hi.hr_name,
    hi.email,
    ah.send_status AS status,  -- Now getting status from application_history
    ec.created_at,
	ah.send_at
FROM email_campaigns ec
JOIN application_history ah 
    ON ec.campaign_id = ah.campaign_id
JOIN hr_info hi 
    ON ah.hr_id = hi.id
WHERE ec.campaign_id = in_campaign_id;
$BODY$;

ALTER FUNCTION public.email_campaign_get_hr_list(integer)
    OWNER TO postgres;

========================
Function 15
========================

-- FUNCTION: public.email_campaign_get_job_info(integer, integer, integer, integer)

-- DROP FUNCTION IF EXISTS public.email_campaign_get_job_info(integer, integer, integer, integer);

CREATE OR REPLACE FUNCTION public.email_campaign_get_job_info(
	in_hrid integer,
	in_campaignid integer,
	in_templateid integer,
	in_sendcount integer)
    RETURNS jsonb
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
DECLARE
    hr_data         JSONB;
    template_data   JSONB;
    v_token         UUID;
BEGIN

    -- 1. Mark this HR row as processing + get tracking token
    UPDATE application_history
    SET send_status = 'processing'
    WHERE campaign_id = in_campaignid
      AND hr_id = in_hrid
    RETURNING tracking_token INTO v_token;

    -- 2. Get HR info
    SELECT to_jsonb(h) INTO hr_data
    FROM (SELECT company_name, hr_name, email FROM hr_info WHERE id = in_hrid) h;

    -- 3. Get template info
    SELECT to_jsonb(t) INTO template_data
    FROM (SELECT subject_title, body FROM template_master WHERE id = in_templateid) t;

    -- 4. Return all three
    RETURN jsonb_build_array(
        jsonb_build_object('hr_info',        hr_data),
        jsonb_build_object('template_info',  template_data),
        jsonb_build_object('tracking_token', v_token)
    );

END;
$BODY$;

ALTER FUNCTION public.email_campaign_get_job_info(integer, integer, integer, integer)
    OWNER TO postgres;

=====================
Function 16
=====================

-- FUNCTION: public.email_campaign_get_tracking_token(integer, integer)

-- DROP FUNCTION IF EXISTS public.email_campaign_get_tracking_token(integer, integer);

CREATE OR REPLACE FUNCTION public.email_campaign_get_tracking_token(
	p_campaign_id integer,
	p_hr_id integer)
    RETURNS uuid
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    v_token UUID;
BEGIN
    SELECT tracking_token INTO v_token
    FROM application_history
    WHERE campaign_id = p_campaign_id AND hr_id = p_hr_id;

    RETURN v_token;
END;
$BODY$;

ALTER FUNCTION public.email_campaign_get_tracking_token(integer, integer)
    OWNER TO postgres;

===================
Function 17
===================

-- FUNCTION: public.email_campaign_record_open(text, timestamp without time zone)

-- DROP FUNCTION IF EXISTS public.email_campaign_record_open(text, timestamp without time zone);

CREATE OR REPLACE FUNCTION public.email_campaign_record_open(
	in_token text,
	in_opened_at timestamp without time zone)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN

    UPDATE application_history
    SET
        is_opened  = true,
        opened_at  = COALESCE(opened_at, in_opened_at),  -- keep first open only
        open_count = open_count + 1
    WHERE tracking_token = in_token::UUID;

END;
$BODY$;

ALTER FUNCTION public.email_campaign_record_open(text, timestamp without time zone)
    OWNER TO postgres;

===================
Function 18
===================

-- FUNCTION: public.email_campaign_update_hr_status(integer, integer, character varying)

-- DROP FUNCTION IF EXISTS public.email_campaign_update_hr_status(integer, integer, character varying);

CREATE OR REPLACE FUNCTION public.email_campaign_update_hr_status(
	in_campaignid integer,
	in_hrid integer,
	in_status character varying)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN

    -- 1. Update send_status in application_history
    UPDATE application_history
    SET send_status = in_status,
	send_at = now()
    WHERE campaign_id = in_campaignid
      AND hr_id = in_hrid;

    -- 2. Update hr_info flags
    IF in_status = 'completed' THEN
        UPDATE hr_info
        SET is_applied  = true,
            is_verified = true
        WHERE id = in_hrid;
    ELSE
        UPDATE hr_info
        SET is_applied  = true,
            is_verified = false
        WHERE id = in_hrid;
    END IF;

END;
$BODY$;

ALTER FUNCTION public.email_campaign_update_hr_status(integer, integer, character varying)
    OWNER TO postgres;

===============
Function 19
===============

-- FUNCTION: public.email_jobs_get_jobs_list(integer)

-- DROP FUNCTION IF EXISTS public.email_jobs_get_jobs_list(integer);

CREATE OR REPLACE FUNCTION public.email_jobs_get_jobs_list(
	in_userid integer)
    RETURNS TABLE(jobid integer, job_status character varying, created text, scheduled_time character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN

RETURN QUERY
SELECT 
	ec.campaign_id AS jobid,
	ec.status AS job_status,
	to_char(ec.created_at, 'DD/MM/YYYY') AS created,
	ec.scheduled_time
FROM email_campaigns ec
where ec.user_id = in_userid
	order by ec.created_at DESC;

END;
$BODY$;

ALTER FUNCTION public.email_jobs_get_jobs_list(integer)
    OWNER TO postgres;

================
Function 20
================

-- FUNCTION: public.get_user_data_by_email(character varying)

-- DROP FUNCTION IF EXISTS public.get_user_data_by_email(character varying);

CREATE OR REPLACE FUNCTION public.get_user_data_by_email(
	in_email character varying)
    RETURNS TABLE(id integer, username character varying, email character varying, password character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN

-- select * from get_user_data_by_email('D@gmail.com')

IF NOT EXISTS (
        SELECT 1 FROM user_master WHERE user_master.email = in_email
    ) THEN
        RAISE EXCEPTION 'No account found with this email address.'
        USING ERRCODE = '22222';
    END IF;

RETURN QUERY
select 
	um.id,
	um.username,
	um.email,
	um.password
from user_master um
where um.email = in_email;

END;
$BODY$;

ALTER FUNCTION public.get_user_data_by_email(character varying)
    OWNER TO postgres;

==================
Function 21
==================

-- FUNCTION: public.get_user_fronted_redirection(integer)

-- DROP FUNCTION IF EXISTS public.get_user_fronted_redirection(integer);

CREATE OR REPLACE FUNCTION public.get_user_fronted_redirection(
	in_userid integer)
    RETURNS TABLE(is_app_pass_set boolean, is_template_set boolean) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL SAFE 
    ROWS 1000

AS $BODY$
BEGIN

-- For test
-- select * from get_user_fronted_redirection(2)
    RETURN QUERY
    SELECT
        -- TRUE only if both app_email and app_password are not null
        (u.app_email IS NOT NULL AND u.app_password IS NOT NULL) AS is_app_pass_set,

        -- TRUE if at least one template is registered for this user
        EXISTS (
            SELECT 1 FROM template_master t WHERE t.userid = in_userid
        ) AS is_template_set

    FROM user_master u
    WHERE u.id = in_userid;
END;
$BODY$;

ALTER FUNCTION public.get_user_fronted_redirection(integer)
    OWNER TO postgres;

==============
Function 22
==============

-- FUNCTION: public.hrmanagement_dashboard_summary(integer)

-- DROP FUNCTION IF EXISTS public.hrmanagement_dashboard_summary(integer);

CREATE OR REPLACE FUNCTION public.hrmanagement_dashboard_summary(
	in_userid integer)
    RETURNS TABLE(total_company bigint, total_hr bigint) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
begin

-- Test function
-- select * from hrmanagement_dashboard_summary(1)
    return query
    select 
        count(distinct company_name) as total_company,
        count(*) as total_hr
    from hr_info
	where user_id = in_userid;
end;
$BODY$;

ALTER FUNCTION public.hrmanagement_dashboard_summary(integer)
    OWNER TO postgres;

==============
Function 23
==============

-- FUNCTION: public.hrmanagement_delete_hr_details(integer)

-- DROP FUNCTION IF EXISTS public.hrmanagement_delete_hr_details(integer);

CREATE OR REPLACE FUNCTION public.hrmanagement_delete_hr_details(
	in_hr_id integer)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN

-- select * from hrmanagement_delete_hr_details(6)

DELETE FROM hr_info WHERE id = in_hr_id;

END;
$BODY$;

ALTER FUNCTION public.hrmanagement_delete_hr_details(integer)
    OWNER TO postgres;

=============
Function 24
=============

-- FUNCTION: public.hrmanagement_get_hr_details(integer)

-- DROP FUNCTION IF EXISTS public.hrmanagement_get_hr_details(integer);

CREATE OR REPLACE FUNCTION public.hrmanagement_get_hr_details(
	in_hr_id integer)
    RETURNS TABLE(id integer, company_name character varying, hr_name character varying, email character varying, mobileno character varying, company_website character varying, is_applied boolean, is_verified boolean, hr_linkedin_profile_link character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL SAFE 
    ROWS 1000

AS $BODY$
BEGIN

-- select * from hrmanagement_get_hr_details(6)

RETURN QUERY
	SELECT
	hr.id,
	hr.company_name,
	hr.hr_name,
	hr.email,
	hr.mobileno,
	hr.company_website,
	hr.is_applied,
	hr.is_verified,
	hr.hr_linkedin_profile_link
	from hr_info hr
	where hr.id = in_hr_id;

END;
$BODY$;

ALTER FUNCTION public.hrmanagement_get_hr_details(integer)
    OWNER TO postgres;

================
Function 25
================

-- FUNCTION: public.hrmanagement_get_hr_info_list(integer, character varying, character varying)

-- DROP FUNCTION IF EXISTS public.hrmanagement_get_hr_info_list(integer, character varying, character varying, integer, integer);

CREATE OR REPLACE FUNCTION public.hrmanagement_get_hr_info_list(
	in_userid integer,
	in_searchterm character varying,
	in_filtername character varying,
	in_page integer,
	in_limit integer)
    RETURNS TABLE(id integer, company_name character varying, hr_name character varying, is_applied boolean, is_verified boolean, created_at timestamp without time zone, last_applied_at timestamp without time zone, hr_linkedin_profile_link character varying, total_count bigint) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE SQL VARCHAR;
BEGIN

	SQL := 'select
		hr.id,
		hr.company_name,
		hr.hr_name,
		hr.is_applied,
		hr.is_verified,
		hr.created_at,        -- 3. SELECTING BARE CREATION TIME
		ap.last_send_at,      -- 4. SELECTING AGGREGATED VALUE FROM OUR LEFT JOIN
		hr.hr_linkedin_profile_link,
		COUNT(*) OVER() AS total_count
	from hr_info hr
	
	/* 5. LEFT JOIN BRINGS THE LATEST APPLICATION TIMESTAMP OR NULL PER HR */
	left join (
		select hr_id, max(send_at) as last_send_at 
		from application_history 
		group by hr_id
	) ap on ap.hr_id = hr.id
	
	/* 6. SWITCHED TO A PARAMETERIZED POSITION BIND ($1) FOR INJECTION SAFETY */
	WHERE hr.user_id = $1';

	IF in_searchterm IS NOT NULL THEN
		SQL := SQL || ' AND (hr.company_name ilike ' || quote_literal(in_searchterm || '%') || ' )';
	END IF;

	IF in_filtername <> 'all_records' THEN
		IF in_filtername = 'not_applied_yet' THEN
			SQL := SQL || ' AND hr.is_applied = false';
		ELSIF in_filtername = 'hr_desc' THEN
			SQL := SQL || ' ORDER BY hr.hr_name DESC';
		ELSE 
			SQL := SQL || ' ORDER BY hr.created_at DESC';
		END IF;
	END IF;
		
	/* 7. SAFELY PASSED IN_USERID AS AN ISOLATED QUERY BIND PARAMETER */
    SQL := SQL || ' LIMIT ' || in_limit || ' OFFSET ' || (in_page - 1) * in_limit;
	RETURN QUERY EXECUTE SQL USING in_userid;
	
END;
$BODY$;

ALTER FUNCTION public.hrmanagement_get_hr_info_list(integer, character varying, character varying, integer, integer)
    OWNER TO postgres;

================
Function 26
================

-- FUNCTION: public.hrmanagement_get_position_list(character varying)

-- DROP FUNCTION IF EXISTS public.hrmanagement_get_position_list(character varying);

CREATE OR REPLACE FUNCTION public.hrmanagement_get_position_list(
	in_positionname character varying)
    RETURNS TABLE(id integer, position_name character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN

    IF in_positionname IS NULL THEN
        RETURN QUERY
        SELECT pm.id, pm.position_name
        FROM position_master pm;

    ELSE
        RETURN QUERY
        SELECT pm.id, pm.position_name
        FROM position_master pm
        WHERE pm.position_name ILIKE in_positionname || '%';

    END IF;

END;
$BODY$;

ALTER FUNCTION public.hrmanagement_get_position_list(character varying)
    OWNER TO postgres;

=================
Function 27
=================

-- FUNCTION: public.hrmanagement_get_selected_ht_info(jsonb, integer)

-- DROP FUNCTION IF EXISTS public.hrmanagement_get_selected_ht_info(jsonb, integer);

CREATE OR REPLACE FUNCTION public.hrmanagement_get_selected_ht_info(
	data jsonb,
	in_userid integer)
    RETURNS TABLE(id integer, company_name character varying, hr_name character varying, email character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN

-- select * from hrmanagement_get_selected_ht_info('[1,2]'::jsonb ,1)

    RETURN QUERY
    SELECT 
        hi.id, 
        hi.company_name, 
        hi.hr_name, 
        hi.email
    FROM hr_info hi
    WHERE hi.id IN (
        SELECT value::int
        FROM jsonb_array_elements_text(data)
    ) AND user_id = in_userid;
END;
$BODY$;

ALTER FUNCTION public.hrmanagement_get_selected_ht_info(jsonb, integer)
    OWNER TO postgres;

===================
Function 28
===================

-- FUNCTION: public.hrmanagement_get_template_list(integer)

-- DROP FUNCTION IF EXISTS public.hrmanagement_get_template_list(integer);

CREATE OR REPLACE FUNCTION public.hrmanagement_get_template_list(
	in_userid integer)
    RETURNS TABLE(id integer, template_name character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN

-- select * from hrmanagement_get_template_list(5)

RETURN QUERY(
	SELECT tm.id, tm.template_name
	FROM template_master tm
	where tm.userid = in_userid
);

END;
$BODY$;

ALTER FUNCTION public.hrmanagement_get_template_list(integer)
    OWNER TO postgres;

==================
Function 29
==================

-- FUNCTION: public.hrmanagement_get_user_app_password_config(integer)

-- DROP FUNCTION IF EXISTS public.hrmanagement_get_user_app_password_config(integer);

CREATE OR REPLACE FUNCTION public.hrmanagement_get_user_app_password_config(
	in_userid integer)
    RETURNS TABLE(app_email character varying, app_password character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN

-- for test
-- select * from hrmanagement_get_user_app_password_config(1)

RETURN QUERY(
	select u.app_email, u.app_password
	from user_master u
	where u.id = in_userid
);

END;
$BODY$;

ALTER FUNCTION public.hrmanagement_get_user_app_password_config(integer)
    OWNER TO postgres;

==============
Function 30
==============

-- FUNCTION: public.hrmanagement_get_user_resume_list(integer)

-- DROP FUNCTION IF EXISTS public.hrmanagement_get_user_resume_list(integer);

CREATE OR REPLACE FUNCTION public.hrmanagement_get_user_resume_list(
	in_userid integer)
    RETURNS TABLE(id integer, filename character varying, upload_at timestamp without time zone) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL SAFE 
    ROWS 1000

AS $BODY$
BEGIN

-- select * from hrmanagement_get_user_resume_list(1)
RETURN QUERY
	SELECT user_resume.id, user_resume.filename, user_resume.upload_at
	from user_resume
	where userid = in_userid
	order by upload_at DESC;

END;
$BODY$;

ALTER FUNCTION public.hrmanagement_get_user_resume_list(integer)
    OWNER TO postgres;

===============
Function 31
===============

-- FUNCTION: public.hrmanagement_store_bulk_template_info(integer, character varying, integer, integer, jsonb, integer, character varying)

-- DROP FUNCTION IF EXISTS public.hrmanagement_store_bulk_template_info(integer, character varying, integer, integer, jsonb, integer, character varying);

CREATE OR REPLACE FUNCTION public.hrmanagement_store_bulk_template_info(
	in_userid integer,
	in_positionname character varying,
	in_templateid integer,
	in_resumeid integer,
	in_selected_hr_ids jsonb,
	in_totalcount integer,
	in_scheduled_time character varying)
    RETURNS TABLE(campaign_id integer, notification_id integer, resume_path character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
    v_campaign_id     INTEGER;
    v_notification_id INTEGER;
    v_hr              JSONB;
	v_resumepath character varying;
BEGIN

    -- 1. Insert campaign (no more selected_hr_ids column)
    INSERT INTO email_campaigns (
        user_id, position_name, template_id, resumeid, status, scheduled_time
    )
    VALUES (
        in_userid, in_positionname, in_templateid, in_resumeid, 'PROCESSING', in_scheduled_time
    )
    RETURNING email_campaigns.campaign_id INTO v_campaign_id;

    -- 2. Insert one row per HR into application_history
    FOR v_hr IN SELECT * FROM jsonb_array_elements(in_selected_hr_ids)
    LOOP
        INSERT INTO application_history (campaign_id, hr_id, send_status)
        VALUES (v_campaign_id, (v_hr->>'hr_id')::INT, 'pending');
    END LOOP;

    -- 3. Insert notification
    INSERT INTO notifications (campaign_id, notification_message, is_read)
    VALUES (v_campaign_id, 'Start Email Send.', false)
    RETURNING notifications.notification_id INTO v_notification_id;

	-- 4. Get resume path
	SELECT user_resume.filepath into v_resumepath 
	from user_resume where user_resume.id = in_resumeid;

    RETURN QUERY SELECT v_campaign_id, v_notification_id, v_resumepath;

END;
$BODY$;

ALTER FUNCTION public.hrmanagement_store_bulk_template_info(integer, character varying, integer, integer, jsonb, integer, character varying)
    OWNER TO postgres;

==================
Function 32
==================

-- FUNCTION: public.hrmanagement_store_hr_info(integer, character varying, character varying, character varying, character varying, character varying, character varying, character varying)

-- DROP FUNCTION IF EXISTS public.hrmanagement_store_hr_info(integer, character varying, character varying, character varying, character varying, character varying, character varying, character varying);

CREATE OR REPLACE FUNCTION public.hrmanagement_store_hr_info(
	in_userid integer,
	in_companyname character varying,
	in_companywebsite character varying,
	in_hrname character varying,
	in_hremail character varying,
	in_hrmobile character varying,
	in_hrlinkedprofile character varying)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
    SET search_path=public
AS $BODY$
BEGIN
    INSERT INTO hr_info(
		user_id,
        company_name,
		hr_name,
        email,
        mobileno,
        company_website,
		hr_linkedin_profile_link
    )
    VALUES (
		in_userid,
        in_companyname,
		in_hrname,
        in_hremail,
        in_hrmobile,
        in_companywebsite,
		in_hrlinkedprofile
    );

END;
$BODY$;

ALTER FUNCTION public.hrmanagement_store_hr_info(integer, character varying, character varying, character varying, character varying, character varying, character varying, character varying)
    OWNER TO postgres;

=================
Function 33
=================

-- FUNCTION: public.hrmanagement_update_hr_details(integer, character varying, character varying, character varying, character varying, character varying, character varying)

-- DROP FUNCTION IF EXISTS public.hrmanagement_update_hr_details(integer, character varying, character varying, character varying, character varying, character varying, character varying);

CREATE OR REPLACE FUNCTION public.hrmanagement_update_hr_details(
	in_hr_id integer,
	in_company_name character varying,
	in_hr_name character varying,
	in_email character varying,
	in_mobileno character varying,
	in_company_website character varying,
	in_hr_linkedin_profile_link character varying)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN

	UPDATE hr_info set
	company_name = in_company_name,
	hr_name = in_hr_name,
	email = in_email,
	mobileno = in_mobileno,
	company_website = in_company_website,
	hr_linkedin_profile_link = in_hr_linkedin_profile_link
	where id = in_hr_id;

END;
$BODY$;

ALTER FUNCTION public.hrmanagement_update_hr_details(integer, character varying, character varying, character varying, character varying, character varying, character varying)
    OWNER TO postgres;

=================
Function 34
=================

-- FUNCTION: public.hrmanagment_store_resume_info(integer, character varying, character varying)

-- DROP FUNCTION IF EXISTS public.hrmanagment_store_resume_info(integer, character varying, character varying);

CREATE OR REPLACE FUNCTION public.hrmanagment_store_resume_info(
	in_usercode integer,
	in_filename character varying,
	in_filepath character varying)
    RETURNS TABLE(out_id integer) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN

-- select * from hrmanagment_store_resume_info(1, 'abc.pdf', 'xyz/abc.pdf')

RETURN QUERY
INSERT INTO user_resume(userid, filename, filepath)
values (in_usercode, in_filename, in_filepath)
RETURNING id ;

END;
$BODY$;

ALTER FUNCTION public.hrmanagment_store_resume_info(integer, character varying, character varying)
    OWNER TO postgres;

==================
Function 35
==================

-- FUNCTION: public.profile_get_user_details(integer)

-- DROP FUNCTION IF EXISTS public.profile_get_user_details(integer);

CREATE OR REPLACE FUNCTION public.profile_get_user_details(
	in_userid integer)
    RETURNS TABLE(id integer, username character varying, email character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN

-- select * from profile_get_user_details(1)

RETURN QUERY
 select u.id, u.username, u.email
 from user_master u
 where u.id = in_userid;

END;
$BODY$;

ALTER FUNCTION public.profile_get_user_details(integer)
    OWNER TO postgres;

====================
Function 36
====================

-- FUNCTION: public.profile_update_password(integer, character varying)

-- DROP FUNCTION IF EXISTS public.profile_update_password(integer, character varying);

CREATE OR REPLACE FUNCTION public.profile_update_password(
	in_userid integer,
	in_password character varying)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN

update user_master
set password = in_password
where id = in_userid;

END;
$BODY$;

ALTER FUNCTION public.profile_update_password(integer, character varying)
    OWNER TO postgres;

================
Function 37
================

-- FUNCTION: public.profile_update_user_details(integer, character varying, character varying)

-- DROP FUNCTION IF EXISTS public.profile_update_user_details(integer, character varying, character varying);

CREATE OR REPLACE FUNCTION public.profile_update_user_details(
	in_userid integer,
	in_username character varying,
	in_useremail character varying)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN

update user_master
set username = in_username,
email = in_useremail
where id = in_userid;

END;
$BODY$;

ALTER FUNCTION public.profile_update_user_details(integer, character varying, character varying)
    OWNER TO postgres;

=====================
Function 38
=====================

-- FUNCTION: public.store_signup_user_data(character varying, character varying, character varying, character varying, date)

-- DROP FUNCTION IF EXISTS public.store_signup_user_data(character varying, character varying, character varying, character varying, date);

CREATE OR REPLACE FUNCTION public.store_signup_user_data(
	in_username character varying,
	in_email character varying,
	in_password character varying,
	in_country character varying,
	in_dob date)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN

-- select * from store_signup_user_data('D', 'D@gmail.com', 'Divy', 'India', '2026-03-13')

IF EXISTS (
    SELECT 1 FROM user_master WHERE email = in_email
) THEN
    RAISE EXCEPTION 'Already Email is registered. Please login.'
    USING ERRCODE = '22222';
END IF;

INSERT INTO user_master(username, email, password, country, dob)
VALUES (in_username, in_email, in_password, in_country,
in_dob
);

END;
$BODY$;

ALTER FUNCTION public.store_signup_user_data(character varying, character varying, character varying, character varying, date)
    OWNER TO postgres;

====================
Function 39
====================

-- FUNCTION: public.template_config_delete_template(integer)

-- DROP FUNCTION IF EXISTS public.template_config_delete_template(integer);

CREATE OR REPLACE FUNCTION public.template_config_delete_template(
	in_templateid integer)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN

	insert into template_deletion_log(template_id)
	values (in_templateid);

	delete from template_master
	where id = in_templateid;

END;
$BODY$;

ALTER FUNCTION public.template_config_delete_template(integer)
    OWNER TO postgres;

=================
Function 40
=================

-- FUNCTION: public.template_config_get_template_info(integer)

-- DROP FUNCTION IF EXISTS public.template_config_get_template_info(integer);

CREATE OR REPLACE FUNCTION public.template_config_get_template_info(
	in_templateid integer)
    RETURNS TABLE(id integer, template_name character varying, subject_title character varying, body character varying, updated_at timestamp without time zone) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN

RETURN QUERY
  select t.id,
  t.template_name,
  t.subject_title,
  t.body,
  t.updated_at
  from template_master t
  where t.id = in_templateid ;

END;
$BODY$;

ALTER FUNCTION public.template_config_get_template_info(integer)
    OWNER TO postgres;

====================
Function 41
====================

-- FUNCTION: public.template_config_store_template(integer, character varying, character varying, character varying)

-- DROP FUNCTION IF EXISTS public.template_config_store_template(integer, character varying, character varying, character varying);

CREATE OR REPLACE FUNCTION public.template_config_store_template(
	in_userid integer,
	in_template_name character varying,
	in_template_subject character varying,
	in_template_body character varying)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
DECLARE
	out_template_id integer;
BEGIN

INSERT INTO template_master(userid, template_name, subject_title, body)
VALUES (in_userid, in_template_name, in_template_subject, in_template_body)
RETURNING id into out_template_id;

END;
$BODY$;

ALTER FUNCTION public.template_config_store_template(integer, character varying, character varying, character varying)
    OWNER TO postgres;

==================
Function 42
==================

-- FUNCTION: public.template_config_update_template_info(integer, character varying, character varying, character varying)

-- DROP FUNCTION IF EXISTS public.template_config_update_template_info(integer, character varying, character varying, character varying);

CREATE OR REPLACE FUNCTION public.template_config_update_template_info(
	in_templateid integer,
	in_template_subject character varying,
	in_template_name character varying,
	in_template_body character varying)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
AS $BODY$
BEGIN

    -- Store old template data in log table
    INSERT INTO template_updation_log(
        template_id,
        template_name,
        template_subject,
        template_body
    )
    SELECT 
        id,
        template_name,
        subject_title,
        body
    FROM template_master
    WHERE id = in_templateid;

    -- Update subject
    IF in_template_subject IS NOT NULL THEN
        UPDATE template_master
        SET subject_title = in_template_subject
        WHERE id = in_templateid;
    END IF;

    -- Update name
    IF in_template_name IS NOT NULL THEN
        UPDATE template_master
        SET template_name = in_template_name
        WHERE id = in_templateid;
    END IF;

    -- Update body
    IF in_template_body IS NOT NULL THEN
        UPDATE template_master
        SET body = in_template_body
        WHERE id = in_templateid;
    END IF;

END;
$BODY$;

ALTER FUNCTION public.template_config_update_template_info(integer, character varying, character varying, character varying)
    OWNER TO postgres;

====================
Function 43
====================

-- FUNCTION: public.template_master_get_template_filter_list(integer, character varying)

-- DROP FUNCTION IF EXISTS public.template_master_get_template_filter_list(integer, character varying);

CREATE OR REPLACE FUNCTION public.template_master_get_template_filter_list(
	in_userid integer,
	in_template_name character varying)
    RETURNS TABLE(id integer, template_name character varying, updated_at timestamp without time zone) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN

-- select * from template_master_get_template_filter_list(5, 'B')

RETURN QUERY
  select t.id,
  t.template_name,
  t.updated_at
  from template_master t
  where t.userid = in_userid and t.template_name ilike '%' || in_template_name || '%';

END;
$BODY$;

ALTER FUNCTION public.template_master_get_template_filter_list(integer, character varying)
    OWNER TO postgres;

==================
Function 44
==================

-- FUNCTION: public.template_master_get_template_list(integer)

-- DROP FUNCTION IF EXISTS public.template_master_get_template_list(integer);

CREATE OR REPLACE FUNCTION public.template_master_get_template_list(
	in_userid integer)
    RETURNS TABLE(id integer, template_name character varying, updated_at timestamp without time zone) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN

-- select * from template_master_get_template_list(5)

RETURN QUERY
  select t.id,
  t.template_name,
  t.updated_at
  from template_master t
  where t.userid = in_userid
  ORDER BY t.created_at DESC;

END;
$BODY$;

ALTER FUNCTION public.template_master_get_template_list(integer)
    OWNER TO postgres;

===============
Function 45
===============

-- FUNCTION: public.uuid_generate_v1()

-- DROP FUNCTION IF EXISTS public.uuid_generate_v1();

CREATE OR REPLACE FUNCTION public.uuid_generate_v1(
	)
    RETURNS uuid
    LANGUAGE 'c'
    COST 1
    VOLATILE STRICT PARALLEL SAFE 
AS '$libdir/uuid-ossp', 'uuid_generate_v1'
;

ALTER FUNCTION public.uuid_generate_v1()
    OWNER TO postgres;

ALTER FUNCTION public.uuid_generate_v1()
    DEPENDS ON EXTENSION "uuid-ossp";

===============
Function 46
===============

-- FUNCTION: public.uuid_generate_v1mc()

-- DROP FUNCTION IF EXISTS public.uuid_generate_v1mc();

CREATE OR REPLACE FUNCTION public.uuid_generate_v1mc(
	)
    RETURNS uuid
    LANGUAGE 'c'
    COST 1
    VOLATILE STRICT PARALLEL SAFE 
AS '$libdir/uuid-ossp', 'uuid_generate_v1mc'
;

ALTER FUNCTION public.uuid_generate_v1mc()
    OWNER TO postgres;

ALTER FUNCTION public.uuid_generate_v1mc()
    DEPENDS ON EXTENSION "uuid-ossp";

==================
Function 47
==================

-- FUNCTION: public.uuid_generate_v3(uuid, text)

-- DROP FUNCTION IF EXISTS public.uuid_generate_v3(uuid, text);

CREATE OR REPLACE FUNCTION public.uuid_generate_v3(
	namespace uuid,
	name text)
    RETURNS uuid
    LANGUAGE 'c'
    COST 1
    IMMUTABLE STRICT PARALLEL SAFE 
AS '$libdir/uuid-ossp', 'uuid_generate_v3'
;

ALTER FUNCTION public.uuid_generate_v3(uuid, text)
    OWNER TO postgres;

ALTER FUNCTION public.uuid_generate_v3(uuid, text)
    DEPENDS ON EXTENSION "uuid-ossp";

==================
Function 48
==================

-- FUNCTION: public.uuid_generate_v4()

-- DROP FUNCTION IF EXISTS public.uuid_generate_v4();

CREATE OR REPLACE FUNCTION public.uuid_generate_v4(
	)
    RETURNS uuid
    LANGUAGE 'c'
    COST 1
    VOLATILE STRICT PARALLEL SAFE 
AS '$libdir/uuid-ossp', 'uuid_generate_v4'
;

ALTER FUNCTION public.uuid_generate_v4()
    OWNER TO postgres;

ALTER FUNCTION public.uuid_generate_v4()
    DEPENDS ON EXTENSION "uuid-ossp";

=====================
Function 49
=====================

-- FUNCTION: public.uuid_generate_v5(uuid, text)

-- DROP FUNCTION IF EXISTS public.uuid_generate_v5(uuid, text);

CREATE OR REPLACE FUNCTION public.uuid_generate_v5(
	namespace uuid,
	name text)
    RETURNS uuid
    LANGUAGE 'c'
    COST 1
    IMMUTABLE STRICT PARALLEL SAFE 
AS '$libdir/uuid-ossp', 'uuid_generate_v5'
;

ALTER FUNCTION public.uuid_generate_v5(uuid, text)
    OWNER TO postgres;

ALTER FUNCTION public.uuid_generate_v5(uuid, text)
    DEPENDS ON EXTENSION "uuid-ossp";

==================
Function 50
==================

-- FUNCTION: public.uuid_nil()

-- DROP FUNCTION IF EXISTS public.uuid_nil();

CREATE OR REPLACE FUNCTION public.uuid_nil(
	)
    RETURNS uuid
    LANGUAGE 'c'
    COST 1
    IMMUTABLE STRICT PARALLEL SAFE 
AS '$libdir/uuid-ossp', 'uuid_nil'
;

ALTER FUNCTION public.uuid_nil()
    OWNER TO postgres;

ALTER FUNCTION public.uuid_nil()
    DEPENDS ON EXTENSION "uuid-ossp";

==================
Function 51
==================

-- FUNCTION: public.uuid_ns_dns()

-- DROP FUNCTION IF EXISTS public.uuid_ns_dns();

CREATE OR REPLACE FUNCTION public.uuid_ns_dns(
	)
    RETURNS uuid
    LANGUAGE 'c'
    COST 1
    IMMUTABLE STRICT PARALLEL SAFE 
AS '$libdir/uuid-ossp', 'uuid_ns_dns'
;

ALTER FUNCTION public.uuid_ns_dns()
    OWNER TO postgres;

ALTER FUNCTION public.uuid_ns_dns()
    DEPENDS ON EXTENSION "uuid-ossp";

==================
Function 52
==================

-- FUNCTION: public.uuid_ns_oid()

-- DROP FUNCTION IF EXISTS public.uuid_ns_oid();

CREATE OR REPLACE FUNCTION public.uuid_ns_oid(
	)
    RETURNS uuid
    LANGUAGE 'c'
    COST 1
    IMMUTABLE STRICT PARALLEL SAFE 
AS '$libdir/uuid-ossp', 'uuid_ns_oid'
;

ALTER FUNCTION public.uuid_ns_oid()
    OWNER TO postgres;

ALTER FUNCTION public.uuid_ns_oid()
    DEPENDS ON EXTENSION "uuid-ossp";

================
Function 53
=================

-- FUNCTION: public.uuid_ns_url()

-- DROP FUNCTION IF EXISTS public.uuid_ns_url();

CREATE OR REPLACE FUNCTION public.uuid_ns_url(
	)
    RETURNS uuid
    LANGUAGE 'c'
    COST 1
    IMMUTABLE STRICT PARALLEL SAFE 
AS '$libdir/uuid-ossp', 'uuid_ns_url'
;

ALTER FUNCTION public.uuid_ns_url()
    OWNER TO postgres;

ALTER FUNCTION public.uuid_ns_url()
    DEPENDS ON EXTENSION "uuid-ossp";

====================
Function 54
=====================

-- FUNCTION: public.uuid_ns_x500()

-- DROP FUNCTION IF EXISTS public.uuid_ns_x500();

CREATE OR REPLACE FUNCTION public.uuid_ns_x500(
	)
    RETURNS uuid
    LANGUAGE 'c'
    COST 1
    IMMUTABLE STRICT PARALLEL SAFE 
AS '$libdir/uuid-ossp', 'uuid_ns_x500'
;

ALTER FUNCTION public.uuid_ns_x500()
    OWNER TO postgres;

ALTER FUNCTION public.uuid_ns_x500()
    DEPENDS ON EXTENSION "uuid-ossp";

