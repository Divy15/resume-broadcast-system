-- AlterTable
ALTER TABLE "hr_info" ADD COLUMN "position_id" INTEGER;

-- Restore Function
CREATE OR REPLACE FUNCTION public.hrmanagement_store_hr_info(
	in_userid integer,
	in_companyname character varying,
	in_companywebsite character varying,
	in_hrname character varying,
	in_hremail character varying,
	in_hrmobile character varying,
	in_positionname character varying,
	in_hrlinkedprofile character varying)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
    SET search_path=public
AS $BODY$
DECLARE
    var_position_id integer;
BEGIN

    INSERT INTO position_master(position_name)
    VALUES (in_positionname)
    ON CONFLICT (position_name)
    DO UPDATE SET position_name = EXCLUDED.position_name
    RETURNING id INTO var_position_id;

    INSERT INTO hr_info(
		user_id,
        company_name,
        hr_name,
        email,
        mobileno,
        company_website,
        position_id,
		hr_linkedin_profile_link
    )
    VALUES (
		in_userid,
        in_companyname,
        in_hrname,
        in_hremail,
        in_hrmobile,
        in_companywebsite,
        var_position_id,
		in_hrlinkedprofile
    );

END;
$BODY$;
