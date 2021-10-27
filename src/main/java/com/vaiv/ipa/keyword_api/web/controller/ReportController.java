package com.vaiv.ipa.keyword_api.web.controller;

import com.vaiv.ipa.keyword_api.restFullApi.domain.ReportParams;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import net.sf.json.JSONObject;

@Controller
@RequestMapping("/assembly")
public class ReportController {
    
    private static Logger logger = LoggerFactory.getLogger(ReportController.class);

    @Autowired
    private ReportService reportService;

    @RequestMapping("/report")
    public String report(Model model, @ModelAttribute ReportParams reportParams ){
        logger.info("@@@ /assembly/report @@@");
        logger.info(reportParams.toString());
        JSONObject legisReport = reportService.getLegisReport(reportParams);
        model.addAttribute("reportParams", reportParams);
        model.addAttribute("agendaList", legisReport.get("agenda"));
        model.addAttribute("pressReleaseList", legisReport.get("pressRelease"));
        model.addAttribute("processingStatusList", legisReport.get("processingStatus"));
        return "report/report";
    }

    

}
