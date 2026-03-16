import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { storeTemplateFormData } from './types';
import { storeTemplate } from './TemplateConfig.service';
import { getTemplateInfo, updateTemplate } from './TemplateConfig.service';

const DYNAMIC_TAGS = ['{{position_name}}', '{{company_name}}', '{{your_name}}', '{{hr_name}}'];

const EmailTemplateEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<storeTemplateFormData>({
    name: '',
    subject: '',
    body: ''
  });

  const insertTag = (tag: string, field: 'subject' | 'body') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field] + ' ' + tag
    }));
  };

  const handleFormSubmit = async() => {
    console.log("final input to form submit:", formData);

    const data = {
      templateid: parseInt(id? id: ''),
      template_name: formData.name,
      template_subject: formData.subject,
      template_body: formData.body
    }

    
    if(!id){
    const response = await storeTemplate(formData);
    console.log("Store template result:", response);
    navigate('/templates');
    };

    if(id){
      const response = await updateTemplate(data);
      console.log("update template", response);
      navigate('/templates');
    }
  };

  useEffect(() => {

    let data= {
      templateid: 0
    };

    if(id){
     data.templateid = parseInt(id)
    };

    const fetchTemplateInfo = async () => {
      const response = await getTemplateInfo(data);


      setFormData({
        name: response?.data[0].template_name,
    subject: response?.data[0].subject_title,
    body: response?.data[0].body
      })
    };

    if(id){
    fetchTemplateInfo();
    };
  }, [id]);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-sm mt-8">
      <h2 className="text-xl font-bold mb-6">{id ? 'Edit Template' : 'Create New Template'}</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
          <input 
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="e.g. Outreach Email - Tech"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject Line</label>
          <div className="flex gap-2 mb-2 flex-wrap">
            {DYNAMIC_TAGS.map(tag => (
              <button key={tag} onClick={() => insertTag(tag, 'subject')} className="text-[10px] bg-gray-100 px-2 py-1 rounded border hover:bg-gray-200">
                + {tag}
              </button>
            ))}
          </div>
          <input 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={formData.subject}
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Body</label>
          <div className="flex gap-2 mb-2 flex-wrap">
            {DYNAMIC_TAGS.map(tag => (
              <button key={tag} onClick={() => insertTag(tag, 'body')} className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-100 hover:bg-blue-100">
                + {tag}
              </button>
            ))}
          </div>
          <textarea 
            rows={10}
            className="w-full p-2 border border-gray-300 rounded-md"
            value={formData.body}
            onChange={(e) => setFormData({...formData, body: e.target.value})}
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={() => navigate('/templates')} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={() => handleFormSubmit()}
          >
            Save Template
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplateEditor;